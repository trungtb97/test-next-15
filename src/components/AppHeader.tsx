"use client";

import { useCartStore } from "@/app/store/cartStore"; // Import store giỏ hàng
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AppHeader: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [shake, setShake] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const leftMenuItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/product" },
    { label: "Tài khoản", href: "/account" },
  ];

  const rightMenuItems = [
    { label: "Liên hệ", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Giỏ hàng", href: "/cart" },
    { label: "Đăng ký", href: "/register" },
  ];

  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleCartClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {isMobile && (
              <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
            {!isMobile && (
              <Box display="flex">
                {leftMenuItems.map((item) => (
                  <Button
                    key={item.href}
                    color="inherit"
                    component={Link}
                    href={item.href}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
            <Box display="flex" justifyContent="center" flexGrow={1}>
              <Image
                src="/banner-so-luoc-Tien-Thang-Vet.jpg"
                width={50}
                height={50}
                alt="Logo"
                style={{ borderRadius: "50%" }}
                onClick={() => router.push(`/`)}
              />
            </Box>
            {!isMobile && (
              <Box display="flex">
                {rightMenuItems.map((item) => (
                  <Button
                    key={item.href}
                    color="inherit"
                    component={Link}
                    href={item.href}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleCartClick}
                sx={{
                  position: "relative",
                  animation: shake ? "shake 0.5s ease-in-out" : "",
                  fontSize: "28px",
                }}
                component={Link}
                href="/cart"
              >
                <ShoppingCartIcon fontSize="large" />
                {totalItems > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      color: "white",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalItems}
                  </Box>
                )}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: "64px" }} />
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ width: 250 }}>
          {[
            ...leftMenuItems,
            { label: "Giới thiệu", href: "/about" },
            ...rightMenuItems,
          ].map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AppHeader;
