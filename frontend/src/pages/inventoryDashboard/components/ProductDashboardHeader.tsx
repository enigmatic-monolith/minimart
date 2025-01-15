import { Add } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { ProductDetailsModal } from "./ProductDetailsModal";

export const ProductDashboardHeader = () => {
    const [modalOpen, setModalOpen] = useState(false);

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
            <IconButton color="primary" onClick={() => setModalOpen(true)}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <ProductDetailsModal
          open={modalOpen}
          mode="create"
          onClose={() => setModalOpen(false)}
        />
      </>
    );
}
