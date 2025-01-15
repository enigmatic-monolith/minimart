import { Grid2 } from "@mui/material";
import { Product } from "../../../redux/api/productApi";
import { ProductItem } from "./ProductItem";
import { useMemo } from "react";

export type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  const sortedById = useMemo(() => {
    return products.slice().sort((a, b) => a.id - b.id);
  }, [products]);

  return (
    <Grid2 container spacing={4}>
      {sortedById.map((product) => (
        <Grid2 key={product.id} size={{ xs: 12, sm: 6, md: 4}}>
          <ProductItem product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};
