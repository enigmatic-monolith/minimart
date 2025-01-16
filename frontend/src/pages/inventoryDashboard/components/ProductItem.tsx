import { useState } from "react";
import { Product } from "../../../redux/api/productApi";
import { ProductCard } from "./ProductCard";
import { ProductDetailsModal } from "./product_details/ProductDetailsModal";

export type ProductItemProps = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ProductCard product={product} onClick={() => setOpenModal(true)} />
      <ProductDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode="view"
        viewEditProductProps={{
          product
        }}
      />
    </>
  );
};
