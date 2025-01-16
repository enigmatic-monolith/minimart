import {
  Typography,
  Grid2,
  Button,
  DialogContent,
  Box,
} from "@mui/material";
import { Product } from "../../../../redux/api/productApi";
import { ProductDetailsMode } from "./ProductDetailsModal";

export type ProductDetailsViewProps = {
  product: Product;
  setMode: (mode: ProductDetailsMode) => void;
};

export const ProductDetailsView = ({
  product,
  setMode,
}: ProductDetailsViewProps) => {
  const defaultImage = "images/default_image.jpg";
  return (
    <>
      <DialogContent>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 5 }}>
            <Box
              component="img"
              src={product.image_url ? product.image_url : defaultImage}
              alt={product.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          </Grid2>
          <Grid2
            size={{ xs: 7 }}
            container
            direction="column"
            justifyContent="center"
          >
            <Grid2 container alignItems="center">
              <Grid2 size={{ xs: 12 }}>
                <Typography variant="h5" fontWeight="bold">
                  {product.name}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 3 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {product.price} VP
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  Qty: {product.quantity}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12 }} textAlign="left">
                <Typography variant="body1" color="text.secondary" mb={2}>
                  {product.desc}
                </Typography>
              </Grid2>
            </Grid2>
            <Button
              onClick={() => setMode("edit")}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          </Grid2>
        </Grid2>
      </DialogContent>
    </>
  );
};
