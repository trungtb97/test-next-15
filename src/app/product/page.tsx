/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetProduct from "./api/useGetProduct";
import { API_IMG_URL } from "../constants";
import { useState } from "react";
import useGetCategory from "./api/useGetCateGory";

const ProductPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: dataCategory } = useGetCategory({});
  const { data: products } = useGetProduct({
    page: 0,
    pageSize: 10,
  });

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          {/* Breadcrumbs nằm bên trái */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" style={{ textDecoration: "none", color: "#1976d2" }}>
              Trang chủ
            </Link>
            <Typography color="textPrimary">Sản phẩm</Typography>
          </Breadcrumbs>

          {/* Select nằm bên phải */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            renderValue={(value) => (value ? value : "Tất cả danh mục")}
            sx={{ minWidth: 150 }} // Đặt kích thước cố định để tránh thay đổi độ rộng
          >
            <MenuItem value="">Tất cả danh mục</MenuItem>
            {dataCategory?.map((i: any) => (
              <MenuItem key={i?.id} value={i?.name}>
                {i?.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Grid container spacing={4} mt={2}>
          {products?.result?.map((product: any) => (
            <Grid item xs={12} sm={6} md={3} key={product?.id}>
              <Card
                onClick={() => router?.push(`/product/${product?.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={`${API_IMG_URL}/${product?.imageUrl}`}
                  alt={product?.name}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "3rem",
                    }}
                  >
                    {product?.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product?.price?.toLocaleString()}$
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Mua ngay
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;
