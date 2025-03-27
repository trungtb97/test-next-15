"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const AppHeader: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  // Các menu items
  const leftMenuItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/product" },
    { label: "Tài khoản", href: "/account" },
  ];

  const rightMenuItems = [
    { label: "Liên hệ", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Giỏ hàng", href: "/cart" },
  ];

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
        {/* Sử dụng Container để giữ layout trên desktop */}
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Mobile: Nút mở menu */}
            {isMobile && (
              <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
            {/* Desktop: Menu trái */}
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
            {/* Logo căn giữa */}
            <Box display="flex" justifyContent="center" flexGrow={1}>
              <Image
                src="/banner-so-luoc-Tien-Thang-Vet.jpg"
                width={50}
                height={50}
                alt="Gà"
                style={{ borderRadius: "50%" }}
                onClick={() => router.push(`/`)}
              />
            </Box>
            {/* Desktop: Menu phải */}
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
            {/* Mobile: Nút giỏ hàng bên phải */}
            {isMobile && (
              <IconButton component={Link} href="/cart" color="inherit">
                <ShoppingCartIcon fontSize="large" />
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
