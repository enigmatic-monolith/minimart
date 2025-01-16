import { PhotoCamera } from "@mui/icons-material";
import {
  DialogContent,
  TextField,
  Button,
  Box,
  Grid2,
  IconButton,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  Product,
  ProductCreate,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../../redux/api/productApi";
import { ProductDetailsMode } from "./ProductDetailsModal";

export type CreateProductProps = {
  onClose: () => void;
};

export type EditProductProps = {
  product: Product;
  setMode: (mode: ProductDetailsMode) => void;
};

export type ProductDetailsFormProps = {
  mode: ProductDetailsMode;
  createProductProps?: CreateProductProps;
  editProductProps?: EditProductProps;
};

export const ProductDetailsForm = ({
  mode,
  createProductProps,
  editProductProps,
}: ProductDetailsFormProps) => {
  const defaultImage = "images/default_image.jpg";
  const [editedProduct, setEditedProduct] = useState<ProductCreate>(
    editProductProps
      ? editProductProps.product
      : {
          name: "",
          desc: "",
          quantity: 0,
          price: 0,
          image_url: null,
        }
  );
  const [image, setImage] = useState<File | null>(null);
  const [onCreate] = useCreateProductMutation();
  const [onUpdate] = useUpdateProductMutation();
  const [onUploadProductImage] = useUploadProductImageMutation();

  const handleChange = useCallback(
    (field: keyof Product, value: string | number) => {
      setEditedProduct({ ...editedProduct, [field]: value });
    },
    [setEditedProduct, editedProduct]
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setEditedProduct({ ...editedProduct, image_url: imageUrl });
      }
    },
    [setImage, setEditedProduct, editedProduct]
  );

  const handleCancel = useCallback(() => {
    if (!editProductProps) return;
    editProductProps.setMode("view");
  }, [editProductProps]);

  const uploadImageAndReturnUrl = useCallback(async () => {
    let image_url = undefined;
    if (image) {
      const res = await onUploadProductImage(image).unwrap();
      image_url = res.image_url;
    }
    return image_url;
  }, [image, onUploadProductImage]);

  const handleUpdate = useCallback(async () => {
    if (!editProductProps || !editedProduct.id) return;
    const imageUrl = await uploadImageAndReturnUrl();
    onUpdate({
      id: editedProduct.id,
      product: { ...editedProduct, image_url: imageUrl },
    });
    editProductProps.setMode("view");
  }, [uploadImageAndReturnUrl, editedProduct, onUpdate, editProductProps]);

  const handleCreate = useCallback(async () => {
    if (!createProductProps) return;
    const imageUrl = await uploadImageAndReturnUrl();
    onCreate({ ...editedProduct, image_url: imageUrl });
    createProductProps.onClose();
  }, [uploadImageAndReturnUrl, onCreate, editedProduct, createProductProps]);

  return (
    <>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ height: "100%" }}>
          <Grid2 size={{ xs: 6 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Box
                component="img"
                src={
                  editedProduct.image_url
                    ? editedProduct.image_url
                    : defaultImage
                }
                alt={editedProduct.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: image ? "brightness(0.8)" : "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "opacity 0.3s",
                  "&:hover": { opacity: 1 },
                }}
              >
                <IconButton
                  component="label"
                  sx={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <PhotoCamera fontSize="large" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid2>
          <Grid2
            size={{ xs: 6 }}
            container
            direction="column"
            justifyContent="center"
          >
            <Grid2 container alignItems="center">
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  value={editedProduct.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Price (VP)"
                  variant="outlined"
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={editedProduct.quantity}
                  onChange={(e) =>
                    handleChange("quantity", Number(e.target.value))
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }} textAlign="left">
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={editedProduct.desc}
                  onChange={(e) => handleChange("desc", e.target.value)}
                />
              </Grid2>
              {mode === "edit" ? (
                <>
                  <Grid2 size={{ xs: 6 }}>
                    <Button
                      onClick={handleCancel}
                      color="error"
                      variant="outlined"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 6 }}>
                    <Button
                      onClick={handleUpdate}
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid2>
                </>
              ) : (
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    onClick={handleCreate}
                    color="primary"
                    variant="outlined"
                    fullWidth
                  >
                    Create
                  </Button>
                </Grid2>
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </DialogContent>
    </>
  );
};
