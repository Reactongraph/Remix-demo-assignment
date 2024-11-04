import React from 'react';
import {formatRelative} from 'date-fns';

import {styled} from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CardActions,
  Stack,
} from '@mui/material';
import {Edit, DeleteOutline} from '@mui/icons-material';

import {AppButton} from '~/global/components/app-button';

import {ApiProduct} from '~/api-client/types';

interface ProductCardProps {
  product: ApiProduct;
  doDeleteItem: (item: ApiProduct) => void;
}

const StatusIndicator = styled('div')<{status: string}>(({theme, status}) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '0 60px 60px 0',
  borderColor: `transparent ${
    status === 'Active' ? theme.palette.success.main : theme.palette.grey[500]
  } transparent transparent`,
  zIndex: 1,
}));
const StatusText = styled('span')(({theme}) => ({
  position: 'absolute',
  top: 15,
  right: -55,
  transform: 'rotate(45deg)',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '10px',
  textTransform: 'uppercase',
}));

const placeholderProduct = 'https://www.mitshealthcare.in/product-image-dummy.jpg';

export const ProductCard: React.FC<ProductCardProps> = ({product, doDeleteItem}) => {
  return (
    <Card sx={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <StatusIndicator status={product.isActive === true ? 'Active' : 'Inactive'}>
        <StatusText>{product.isActive === true ? 'Active' : 'Inactive'}</StatusText>
      </StatusIndicator>
      <CardMedia
        component="img"
        image={product.image || placeholderProduct}
        alt={product.title.en || product.title.ar}
        sx={{
          height: 200,
          objectFit: 'cover', // Ensures the image covers the area
        }}
      />
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h6" fontSize={16}>
          {product.title.en || product.title.ar}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
          <Box sx={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
            <Typography
              variant="h6"
              color="textDisabled"
              sx={{
                textDecoration: 'line-through',
                marginRight: 1,
                fontSize: 12,
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            {product.priceSale && (
              <Typography
                variant="h6"
                color="success"
                fontWeight={600}
                sx={{
                  fontSize: 12,
                }}
              >
                ${product.priceSale.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              fontSize: 12,
            }}
          >
            <Box>Created on: {formatRelative(new Date(product.createdAt), new Date())}</Box>
            <Box>
              Updated on :{' '}
              {product.updatedAt && product.updatedAt !== product.createdAt
                ? formatRelative(new Date(product.updatedAt), new Date())
                : '---'}
            </Box>
          </Box>
          {/* */}
        </Box>
      </CardContent>
      <CardActions sx={{position: 'absolute', top: 160, right: 0}}>
        <Stack spacing={1} direction="row-reverse">
          <AppButton to={`/products/${product.productId}`} sx={{minWidth: 0, padding: 0}}>
            <Edit />
          </AppButton>
          <Button
            variant="text"
            onClick={() => doDeleteItem(product)}
            sx={{minWidth: 0, padding: 0}}
          >
            <DeleteOutline />
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
