"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const mockProducts = [
  {
    id: 1,
    name: "Giải độc gan",
    price: 115000,
    image: "/images/giaidoccan.jpg",
    category: "thuoc",
  },
  {
    id: 2,
    name: "ADE - Canxi thảo dược",
    price: 135000,
    image: "/images/adecanxi.jpg",
    category: "thuoc",
  },
  {
    id: 3,
    name: "Vitamin C 30",
    price: 235000,
    image: "/images/vitaminc30.jpg",
    category: "vitamin",
  },
  {
    id: 4,
    name: "B Complex",
    price: 105000,
    image: "/images/bcomplex.jpg",
    category: "vitamin",
  },
  {
    id: 5,
    name: "GLUCO-KC-Điện giải",
    price: 70000,
    image: "/images/glucokc.jpg",
    category: "dien-giai",
  },
  {
    id: 6,
    name: "VTY-CN E Selen",
    price: 325000,
    image: "/images/vtycnselen.jpg",
    category: "thuoc",
  },
  {
    id: 7,
    name: "MumMilk",
    price: 149000,
    image: "/images/mummilk.jpg",
    category: "thuc-an",
  },
  {
    id: 8,
    name: "Tetra-Trứng",
    price: 145000,
    image: "/images/tetratrung.jpg",
    category: "dien-giai",
  },
];

const ProductPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [sortOrder, setSortOrder] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();
  console.log(router, "router:::;");

  useEffect(() => {
    let filteredProducts = mockProducts;

    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "priceAsc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortOrder === "priceDesc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
    }

    setProducts(filteredProducts);
  }, [sortOrder, selectedCategory]);

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <AppHeader />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Typography color="gray" variant="h6">
            SẢN PHẨM THÚ Y
          </Typography>
          <Box display="flex" gap={2}>
            {/* Bộ lọc danh mục */}
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">Tất cả danh mục</MenuItem>
              <MenuItem value="thuoc">Thuốc</MenuItem>
              <MenuItem value="vitamin">Vitamin</MenuItem>
              <MenuItem value="dien-giai">Điện giải</MenuItem>
              <MenuItem value="thuc-an">Thức ăn</MenuItem>
            </Select>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="popular">Thứ tự theo mức độ phổ biến</MenuItem>
              <MenuItem value="priceAsc">Giá: Thấp đến Cao</MenuItem>
              <MenuItem value="priceDesc">Giá: Cao đến Thấp</MenuItem>
            </Select>
          </Box>
        </Box>
        <Grid container spacing={4} mt={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                onClick={() => router.push(`/product/${product.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price.toLocaleString()} đ
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
      <Footer />
    </Box>
  );
};

export default ProductPage;
