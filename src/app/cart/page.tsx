/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { API_IMG_URL } from "../constants";
import { useCartStore } from "../store/cartStore";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = cartItems?.reduce(
    (acc: any, item: any) => acc + item?.price * item?.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography color="black" variant="h5" fontWeight="bold">
        GIỎ HÀNG CỦA BẠN
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box borderBottom="1px solid #ddd" pb={2} mb={2}>
            <Typography color="primary" variant="subtitle1" fontWeight="bold">
              SẢN PHẨM
            </Typography>
          </Box>
          {cartItems.map((item: any) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              py={2}
              borderBottom="1px solid #ddd"
            >
              <Image
                src={`${API_IMG_URL}/${item?.imageUrl}`}
                width={60}
                height={80}
                alt={item?.name}
              />
              <Box ml={2} flex={1}>
                <Typography color="primary" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="black">
                  {item?.categoryName}
                </Typography>
                <Box display="flex" alignItems="center" mt={2} gap={1}>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    sx={{ minWidth: 36, padding: "4px 8px" }}
                  >
                    <Remove />
                  </Button>
                  <Typography color="black" mx={1}>
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    sx={{ minWidth: 36, padding: "4px 8px" }}
                  >
                    <Add />
                  </Button>
                  <Tooltip title="Xóa sản phẩm">
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: "red", ml: 1 }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Typography color="primary" fontWeight="bold">
                {item?.price.toLocaleString()}$
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box p={2} border="1px solid #757575" borderRadius={2}>
            <Typography color="primary" variant="h6" fontWeight="bold">
              GIÁ TRỊ GIỎ HÀNG
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black">Tạm tính</Typography>
              <Typography color="primary" fontWeight="bold">
                {subtotal?.toLocaleString()}$
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black">Giao hàng</Typography>
              <Typography color="primary">Miễn phí</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography color="primary" variant="h6" fontWeight="bold">
                Tổng
              </Typography>
              <Typography color="red" variant="h6" fontWeight="bold">
                {total?.toLocaleString()}$
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
