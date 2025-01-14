import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductDetailsView, ProductDetailsViewProps } from "./ProductDetailsView";
import { EditProductProps, ProductDetailsForm } from "./ProductDetailsForm";

export type ProductDetailsMode = "view" | "edit" | "create";
export type ViewEditProductProps =  Omit<
  EditProductProps & ProductDetailsViewProps,
  "setMode" | "onClose"
>;

export type ProductDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  mode: ProductDetailsMode;
  viewEditProductProps: ViewEditProductProps
};

export const ProductDetailsModal = ({
  open,
  onClose,
  mode,
  viewEditProductProps,
}: ProductDetailsModalProps) => {
  const [currMode, setMode] = useState(mode);

  useEffect(() => {
    setMode(mode);
  }, [open, mode]);

  return <Dialog open={open} onClose={onClose}>
    {currMode === 'view' && <ProductDetailsView {...viewEditProductProps} setMode={setMode}/>}
    {currMode === 'edit' && <ProductDetailsForm editProductProps={{ ...viewEditProductProps, setMode}} mode={currMode} />}
  </Dialog>;
};
