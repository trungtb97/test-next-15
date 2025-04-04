"use client";

import { use, useState } from "react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Add, Remove } from "@mui/icons-material";
import useGetDetail from "./api/useGetDetail";
import { API_IMG_URL } from "@/app/constants";
import { useCartStore } from "@/app/store/cartStore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: product } = useGetDetail(id);
  const [tabIndex, setTabIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shake, setShake] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const columns: GridColDef[] = [
    { field: "field", headerName: "Thuộc tính", flex: 1 },
    { field: "value", headerName: "Giá trị", flex: 2 },
  ];

  const rows = [
    { id: 1, field: "Thông tin sản phẩm", value: product?.name || "" },
    { id: 2, field: "Danh mục sản phẩm", value: product?.categoryName || "" },
    { id: 3, field: "Hãng sản xuất", value: product?.authorName || "" },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity,
      imageUrl: product?.imageUrl,
      description: product.description,
      categoryName: product?.categoryName,
    });
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <AppHeader />
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={6}>
            <Image
              src={`${API_IMG_URL}/${product?.imageUrl}`}
              alt="Sản phẩm"
              width={400}
              height={400}
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="black" variant="h4" fontWeight="bold">
              {product?.name}
            </Typography>
            <Typography variant="h5" color="primary" mt={2}>
              {product?.price?.toLocaleString()}$
            </Typography>
            <Typography color="gray" variant="body1" mt={2}>
              {product?.description}
            </Typography>
            <Box display="flex" alignItems="center" mt={4} gap={2}>
              <Box
                display="flex"
                alignItems="center"
                border="1px solid #ccc"
                borderRadius="50px"
                overflow="hidden"
              >
                <IconButton
                  size="small"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  <Remove />
                </IconButton>
                <Typography
                  color="black"
                  variant="h6"
                  sx={{ minWidth: "40px", textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Add />
                </IconButton>
              </Box>{" "}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{
                  animation: shake ? "shake 0.5s ease-in-out" : "", // Áp dụng hiệu ứng rung khi thêm vào giỏ hàng
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box mt={6}>
          <Tabs
            value={tabIndex}
            onChange={(event, newIndex) => setTabIndex(newIndex)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Mô tả" />
            <Tab label={`Đánh giá (${product?.reviews?.length})`} />
          </Tabs>
          {tabIndex === 0 && (
            <Box sx={{ height: 250, width: "100%", mt: 3 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                hideFooter
                sx={{
                  "& .MuiDataGrid-cell": {
                    color: "black",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={3}>
              {product?.reviews?.length === 0 ? (
                <Typography>Chưa có đánh giá nào.</Typography>
              ) : (
                product?.reviews?.map((review: string, index: string) => (
                  <Box
                    key={index}
                    mt={2}
                    p={2}
                    border="1px solid #ddd"
                    borderRadius="10px"
                  >
                    {/* <Typography fontWeight="bold">{review.user}</Typography>
                  <Typography>{review.comment}</Typography> */}
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export default ProductDetail;
