import { Add } from "@mui/icons-material";
import {
  Box,
  Typography,
  Badge,
  Button,
  Grid2,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ProductDetailsModal } from "../product_details/ProductDetailsModal";
import { ProductRequestModal } from "../product_request/ProductRequestModal";
import { useGetAllProductRequestQuery } from "../../../../redux/api/productRequestApi";

export const ProductDashboardHeader = () => {
  const { data: productRequests = [], isLoading } =
    useGetAllProductRequestQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);

  const pendingRequestsCount = useMemo(() => {
    return productRequests.slice().filter((req) => req.status === "pending")
      .length;
  }, [productRequests]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#213555",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            Inventory
          </Typography>
          <Grid2 container gap={3}>
            <Badge badgeContent={pendingRequestsCount} color="error">
              <Button
                onClick={() => setOpenRequestModal(true)}
                color="secondary"
                variant="contained"
              >
                View Requests
              </Button>
            </Badge>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setModalOpen(true)}
            >
              New Product
            </Button>
          </Grid2>
        </Box>
      </Box>
      <ProductDetailsModal
        open={modalOpen}
        mode="create"
        onClose={() => setModalOpen(false)}
      />
      <ProductRequestModal
        productRequests={productRequests}
        open={openRequestModal}
        onClose={() => setOpenRequestModal(false)}
      />
    </>
  );
};
