import { Box, CircularProgress } from "@mui/material";
import { useGetAllProductsQuery } from "../../redux/api/productApi";
import { ProductList } from "./components/ProductList";

export const InventoryDashboard = () => {
  const { data: products = [], isLoading } = useGetAllProductsQuery();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#3E5879",
          borderRadius: 2,
          boxShadow: 3,
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ padding: 4 }}>
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
