import { Product } from '../../../redux/api/productApi'
import { ProductCard } from './ProductCard';

export type ProductItemProps = {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <ProductCard product={product} />
    </>
  )
}
