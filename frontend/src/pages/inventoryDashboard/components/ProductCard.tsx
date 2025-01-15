import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
} from "@mui/material";
import { Product } from "../../../redux/api/productApi";

export type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const defaultImage = "images/default_image.jpg";

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={product.image_url ? product.image_url : defaultImage}
          alt={product.name}
        />
        <CardContent>
          <Grid2 container alignItems="center">
            <Grid2 size={{xs: 8}} textAlign="left">
              <Typography variant="h6" fontWeight="bold" noWrap>
                {product.name}
              </Typography>
            </Grid2>
            <Grid2 size={{xs: 4}} textAlign="right">
              <Typography variant="h6" fontWeight="bold" color="primary">
                {product.price} VP
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Qty: {product.quantity}
              </Typography>
            </Grid2>
          </Grid2>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
