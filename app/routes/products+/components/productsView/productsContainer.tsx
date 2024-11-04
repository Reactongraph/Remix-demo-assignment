import React from 'react';

import {useMediaQuery, useTheme, Box} from '@mui/material';

import {ApiProduct} from '~/api-client/types';

import {ProductCard} from './productCard';

interface ProductContainerProps {
  products?: ApiProduct[];
  isLoading: boolean;
  doDeleteItem: (item: ApiProduct) => void;
}

export const ProductContainer: React.FC<ProductContainerProps> = ({
  products,
  isLoading,
  doDeleteItem,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with your SkeletonOnLoading component
  }

  if (isMobile) {
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        {products &&
          products.map(product => (
            <ProductCard product={product} key={product.productId} doDeleteItem={doDeleteItem} />
          ))}
      </Box>
    );
  }
};
