"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Bệnh Newcastle ở gà là gì?",
    description:
      "Bệnh Newcastle (hay còn gọi là bệnh gà rù) là một bệnh rất phổ biến...",
    image: "/anh-bia-facebook-4.jpg",
    date: "24 Th12",
  },
  {
    id: 2,
    title: "3 Bệnh Gan Báo động Trên Tôm và Cách Xử Lý Hiệu Quả",
    description:
      "Gan tôm có vai trò quan trọng trong quá trình tiêu hóa và loại bỏ độc...",
    image: "/anh-bia-facebook-5.jpg",
    date: "24 Th12",
  },
  {
    id: 3,
    title: "Khoáng vi lượng trong chăn nuôi Lợn",
    description: "Khoáng vi lượng chỉ chiếm một phần nhỏ nhưng lại đóng góp...",
    image: "/anh-bia-facebook-6.jpg",
    date: "23 Th12",
  },
  {
    id: 4,
    title:
      "Điểm danh 3 loại bệnh thường gặp ở gà và thuốc thú y đặc trị tốt nhất",
    description:
      "Ngành chăn nuôi gia cầm tại Việt Nam trong nhiều năm qua đạt được những...",
    image: "/anh-bia-facebook-6.jpg",
    date: "17 Th12",
  },
];

const BlogPage = () => {
  return (
    <Box maxWidth="lg" mx="auto" mt={3} p={2}>
      <Grid container spacing={3}>
        {blogPosts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ width: 180, height: 120, objectFit: "cover" }}
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography
                  variant="caption"
                  color="white"
                  sx={{
                    backgroundColor: "#4CAF50",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {post.date}
                </Typography>
                <Typography
                  variant="h6"
                  component={Link}
                  href={`/blog/${post.id}`}
                  sx={{
                    color: "#007BFF",
                    textDecoration: "none",
                    fontWeight: "bold",
                    display: "block",
                    mt: 1,
                  }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPage;
