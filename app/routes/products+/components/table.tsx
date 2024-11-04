import {Paper, Table, TableBody, TableContainer} from '@mui/material';

import {TableRowEmpty} from '~/global/components/table-row-empty';

import {ApiProduct} from '~/api-client/types';

import {ProductsTableHead} from './table-head';
import {ProductsTableRow} from './table-row';
import {ProductsTableRowSkeleton} from './table-row-skeleton';

export const ProductsTable = ({
  data,
  isLoading,
  doDeleteItem,
}: {
  data?: ApiProduct[];
  isLoading: boolean;
  doDeleteItem: (item: ApiProduct) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <ProductsTableHead />
        <TableBody>
          {isLoading ? (
            <ProductsTableRowSkeleton />
          ) : !data?.length ? (
            <TableRowEmpty actionURL="/products/create" colSpan={4} />
          ) : (
            data?.map(row => (
              <ProductsTableRow key={row.productId} row={row} doDeleteItem={doDeleteItem} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
