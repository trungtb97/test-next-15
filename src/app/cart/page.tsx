"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "BIOZYM MEN SỐNG CHỊU KHÁNG SINH SIÊU TAN",
      price: 125000,
      quantity: 1,
      image: "/anh-bia-facebook-4.jpg", // Đặt đường dẫn ảnh sản phẩm
      description: "Phòng phân trắng lợn con, sưng phù đầu",
    },
    {
      id: 2,
      name: "BIOZYM MEN",
      price: 125000,
      quantity: 1,
      image: "/anh-bia-facebook-4.jpg", // Đặt đường dẫn ảnh sản phẩm
      description: "Phòng phân trắng lợn con, sưng phù đầu",
    },
    {
      id: 3,
      name: "BIOZYM MEN",
      price: 125000,
      quantity: 1,
      image: "/anh-bia-facebook-4.jpg", // Đặt đường dẫn ảnh sản phẩm
      description: "Phòng phân trắng lợn con, sưng phù đầu",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography color="black" variant="h5" fontWeight="bold">
        SHOPPING CART
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box borderBottom="1px solid #ddd" pb={2} mb={2}>
            <Typography color="primary" variant="subtitle1" fontWeight="bold">
              SẢN PHẨM
            </Typography>
          </Box>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              py={2}
              borderBottom="1px solid #ddd"
            >
              <Image src={item.image} width={60} height={80} alt={item.name} />
              <Box ml={2} flex={1}>
                <Typography color="primary" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="black">
                  {item.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Button size="small">-</Button>
                  <Typography mx={1}>{item.quantity}</Typography>
                  <Button size="small">+</Button>
                </Box>
                <Link
                  href="#"
                  style={{ fontSize: 12, color: "red", textDecoration: "none" }}
                >
                  Remove item
                </Link>
              </Box>
              <Typography fontWeight="bold">
                {item.price.toLocaleString()} đ
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box p={2} border="1px solid #757575" borderRadius={2}>
            <Typography variant="h6" fontWeight="bold">
              CỘNG GIỎ HÀNG
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tạm tính</Typography>
              <Typography fontWeight="bold">
                {subtotal.toLocaleString()}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Giao hàng</Typography>
              <Typography>Miễn phí</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Tổng
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {total.toLocaleString()} đ
              </Typography>
            </Box>
            <Button fullWidth variant="contained" color="primary">
              Thanh toán
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
