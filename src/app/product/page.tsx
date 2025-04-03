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
  Pagination,
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
import useGetAuthor from "./api/useGetAuthor";

const ProductPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const { data: dataCategory } = useGetCategory({});
  const { data: dataAuthor } = useGetAuthor({});
  const { data: products } = useGetProduct({
    page: page,
    pageSize: pageSize,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                href="/"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Trang chủ
              </Link>
              <Typography color="textPrimary">Linh kiện máy tính</Typography>
            </Breadcrumbs>
          </Box>
          <Box display="flex" gap={2}>
            <Select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Hãng sản xuất")}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {dataAuthor?.map((i: any) => (
                <MenuItem key={i?.id} value={i?.name}>
                  {i?.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              renderValue={(value) => (value ? value : "Danh mục")}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {dataCategory?.map((i: any) => (
                <MenuItem key={i?.id} value={i?.name}>
                  {i?.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
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
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={products?.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
