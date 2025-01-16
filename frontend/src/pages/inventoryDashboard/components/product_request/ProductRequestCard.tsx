import { Check, Close } from "@mui/icons-material";
import { Paper, Grid2, Typography, Chip, IconButton } from "@mui/material";
import {
  ProductRequest,
  useApproveProductRequestMutation,
  useRejectProductRequestMutation,
} from "../../../../redux/api/productRequestApi";
import { useCallback } from "react";
import { useCreateProductMutation } from "../../../../redux/api/productApi";

export type ProductRequestCardProps = {
  request: ProductRequest;
};

export const ProductRequestCard = ({ request }: ProductRequestCardProps) => {
  const [approveRequest] = useApproveProductRequestMutation();
  const [createProduct] = useCreateProductMutation();
  const [rejectRequest] = useRejectProductRequestMutation();

  const handleApprove = useCallback(() => {
    approveRequest(request.id);
    createProduct({
      name: request.name,
      desc: request.desc,
      price: 0,
      quantity: 0,
    });
  }, [approveRequest, createProduct, request]);

  const handleReject = useCallback(() => {
    rejectRequest(request.id);
  }, [rejectRequest, request]);

  return (
    <Paper
      key={request.id}
      elevation={2}
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Grid2 container display="flex" gap={1} direction="column">
        <Grid2 display="flex" gap={1}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {request.name}
          </Typography>
          <Chip
            label={request.status}
            color={
              request.status === "pending"
                ? "warning"
                : request.status === "approved"
                ? "success"
                : "error"
            }
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {request.desc}
          </Typography>
        </Grid2>
      </Grid2>
      {request.status === "pending" && (
        <Grid2
          display="flex"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <IconButton color="success" size="small" onClick={handleApprove}>
            <Check />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={handleReject}
          >
            <Close />
          </IconButton>
        </Grid2>
      )}
    </Paper>
  );
};
