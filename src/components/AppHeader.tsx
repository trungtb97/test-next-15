"use client";

import { AppBar, Box, Button, Toolbar, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AppHeader: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo sát trái */}
        <Box display="flex" alignItems="center">
          <Image
            src="/banner-so-luoc-Tien-Thang-Vet.jpg"
            width={50}
            height={50}
            alt="Gà"
            style={{ borderRadius: "50%" }}
          />
        </Box>

        {/* Menu điều hướng */}
        <Box display="flex" alignItems="center">
          <Button color="inherit" component={Link} href="/home">
            Trang chủ
          </Button>
          <Button color="inherit" component={Link} href="/product">
            Sản phẩm
          </Button>
          <Button color="inherit" component={Link} href="/about">
            Giới thiệu
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            Liên hệ
          </Button>

          {/* Nút Avatar và Giỏ hàng */}
          <Box display="flex" alignItems="center" ml={2}>
            <IconButton component={Link} href="/account" color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <IconButton component={Link} href="/cart" color="inherit">
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
