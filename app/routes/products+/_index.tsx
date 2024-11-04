import type {MetaFunction} from '@remix-run/node';
import {redirect} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {Stack, useTheme, useMediaQuery} from '@mui/material';

import {useQueryProductsList, useMutationProductsDelete} from '~/services/products';

import {SkeletonOnLoading} from '~/global/components/skeleton-on-loading';
import {AppButton} from '~/global/components/app-button';

import {ApiProduct} from '~/api-client/types';

import {ProductsTable} from './components/table';
import {ProductContainer} from './components/productsView/productsContainer';

export const handle = {i18n: ['common', 'products']};
export const meta: MetaFunction = () => [{title: 'Remix App - Products'}];

export const clientLoader = async () => {
  if (!window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

export default function Products() {
  const {t} = useTranslation(['common']);
  const {data, isLoading} = useQueryProductsList();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {enqueueSnackbar} = useSnackbar();
  const deleteItem = useMutationProductsDelete();

  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.productId},
      {
        onSuccess: async result => {
          result?.meta?.message && enqueueSnackbar(result?.meta?.message);
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error');
        },
      },
    );
  };

  return (
    <>
      <Stack alignItems="flex-end" my={2}>
        <SkeletonOnLoading isLoading={isLoading}>
          <AppButton to="/products/create" variant="contained">
            {t('common:create')}
          </AppButton>
        </SkeletonOnLoading>
      </Stack>
      {isMobile ? (
        <ProductContainer
          products={data?.result}
          isLoading={isLoading}
          doDeleteItem={doDeleteItem}
        />
      ) : (
        <ProductsTable data={data?.result} isLoading={isLoading} doDeleteItem={doDeleteItem} />
      )}
    </>
  );
}
