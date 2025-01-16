import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { ProductRequest } from "../../../../redux/api/productRequestApi";
import { ProductRequestCard } from "./ProductRequestCard";

export type ProductRequestModalProps = {
    open: boolean;
    onClose: () => void;
    productRequests: ProductRequest[];
}

export const ProductRequestModal = ({ open, onClose, productRequests }: ProductRequestModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Product Requests
        </Typography>
        <Stack spacing={1} maxHeight="40vh">
          {productRequests.map((request) => (
            <ProductRequestCard request={request}/>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
