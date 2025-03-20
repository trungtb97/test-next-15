"use client";

import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenModal = (value: any) => {
    setSelectedProduct(value);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên sản phẩm", flex: 1 },
    { field: "price", headerName: "Giá", width: 150 },
    { field: "category", headerName: "Danh mục", width: 180 },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 100,
      align: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (value: any) => (
        <IconButton color="primary" onClick={() => handleOpenModal(value?.row)}>
          <Visibility />
        </IconButton>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "CPU Intel i9", price: "10,000,000đ", category: "Vi xử lý" },
    {
      id: 2,
      name: "RAM Corsair 16GB",
      price: "2,500,000đ",
      category: "Bộ nhớ",
    },
    {
      id: 3,
      name: "SSD Samsung 1TB",
      price: "3,200,000đ",
      category: "Lưu trữ",
    },
    {
      id: 4,
      name: "Card RTX 4070",
      price: "15,000,000đ",
      category: "Card đồ họa",
    },
  ];

  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="lg">
        <AppHeader />
        <Box mt={isMobile ? 2 : 4}>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            style={{ marginTop: "20px" }}
          >
            {[
              "/anh-bia-facebook-4.jpg",
              "/anh-bia-facebook-5.jpg",
              "/anh-bia-facebook-6.jpg",
            ].map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={`slide ${index + 1}`}
                  width={1200}
                  height={600}
                  style={{
                    width: "100%",
                    height: isMobile ? "200px" : isTablet ? "400px" : "auto",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          mt={isMobile ? 2 : 4}
          textAlign={isMobile ? "center" : "left"}
        >
          <Grid
            container
            spacing={4}
            alignItems="start"
            flexDirection={isMobile ? "column-reverse" : "row"}
          >
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
              mb={isMobile ? 2 : 0}
            >
              <Box position="relative">
                <Image
                  src="/banner-so-luoc-Tien-Thang-Vet.jpg"
                  width={isMobile ? 250 : 400}
                  height={isMobile ? 250 : 400}
                  alt="Gà"
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems={isMobile ? "center" : "flex-start"}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="bold"
                color="blue"
                gutterBottom
              >
                VỀ CHÚNG TÔI
              </Typography>
              <Typography color="gray" variant="body1" paragraph>
                Trải qua gần một thập kỷ nỗ lực và phát triển với rất nhiều
                thăng trầm trong chặng đường khẳng định vị thế.
              </Typography>
              <Typography color="gray" variant="body1" paragraph>
                Viện Nghiên cứu Phát triển Thú y Chăn Nuôi ra đời với sứ mệnh
                mang tới nguồn thực phẩm sạch và an toàn cho con người!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: isMobile ? 1 : 2, width: isMobile ? "100%" : "auto" }}
              >
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          mt={isMobile ? 2 : 4}
          textAlign={isMobile ? "center" : "left"}
        >
          <Grid item xs={12}>
            <DataGrid
              // {...data}
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              autoHeight
            />
          </Grid>
        </Grid>
      </Container>
      <ProductDetail
        open={openModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
      <Footer />
    </Box>
  );
};

export default HomePage;
