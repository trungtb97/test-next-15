"use client";

import { useState } from "react";
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

// Giả lập danh sách sản phẩm (sau này có thể thay bằng API)
const mockProducts = [
  {
    id: "1",
    name: "Giải độc gan",
    price: 115000,
    image: "/images/giaidoccan.jpg",
    description: "Giải độc, tăng cường chức năng gan, thận...",
    details: {
      effect: "Tái tạo tế bào Gan, hỗ trợ Gan thải độc",
      ingredients: [
        { name: "Sorbitol", amount: "800mg" },
        { name: "Lysine", amount: "2000mg" },
        { name: "Methionine", amount: "1000mg" },
        { name: "Vitamin C", amount: "1.500mg" },
      ],
      usage: "Pha nước uống hoặc trộn thức ăn.",
    },
    reviews: [],
  },
  {
    id: "2",
    name: "ADE - Canxi thảo dược",
    price: 135000,
    image: "/images/adecanxi.jpg",
    description: "Tăng cường hấp thụ canxi, tốt cho xương...",
    details: {
      effect: "Tăng cường hấp thụ canxi",
      ingredients: [
        { name: "Vitamin A", amount: "5000 IU" },
        { name: "Vitamin D3", amount: "1000 IU" },
      ],
      usage: "Sử dụng hàng ngày để tăng cường sức khoẻ.",
    },
    reviews: [],
  },
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = mockProducts.find((p) => p.id === params.id);

  const [tabIndex, setTabIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4">Sản phẩm không tồn tại!</Typography>
      </Container>
    );
  }

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <AppHeader />
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={6}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="black" variant="h4" fontWeight="bold">
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" mt={2}>
              {product.price.toLocaleString()} đ
            </Typography>
            <Typography color="gray" variant="body1" mt={2}>
              {product.description}
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
              <Button variant="contained" color="primary">
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
            <Tab label={`Đánh giá (${product.reviews.length})`} />
          </Tabs>
          {tabIndex === 0 && (
            <Box mt={3}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Tác dụng
              </Typography>
              <Typography color="black">{product.details.effect}</Typography>

              <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
                Thành phần
              </Typography>
              <ul>
                {product.details.ingredients.map((ing, index) => (
                  <li key={index}>
                    <Typography color="black">
                      {ing.name} - {ing.amount}
                    </Typography>
                  </li>
                ))}
              </ul>

              <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
                Hướng dẫn sử dụng
              </Typography>
              <Typography>{product.details.usage}</Typography>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={3}>
              {product.reviews.length === 0 ? (
                <Typography>Chưa có đánh giá nào.</Typography>
              ) : (
                product.reviews.map((review, index) => (
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
