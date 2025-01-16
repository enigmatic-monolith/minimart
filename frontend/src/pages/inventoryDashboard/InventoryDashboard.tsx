import { Box, CircularProgress } from "@mui/material";
import { useGetAllProductsQuery } from "../../redux/api/productApi";
import { ProductList } from "./components/ProductList";
import { ProductDashboardHeader } from "./components/header/ProductDashboardHeader";

export const InventoryDashboard = () => {
  const { data: products = [], isLoading } = useGetAllProductsQuery();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#3E5879",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <ProductDashboardHeader />
        <Box sx={{ padding: 4, height: "80vh", overflowY: "auto" }}>
          {isLoading ? (
            <CircularProgress size="4rem" />
          ) : (
            <ProductList products={products} />
          )}
        </Box>
      </Box>
    </>
  );
};
