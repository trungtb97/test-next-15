/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useLogin from "./api/useLogin";
import { useUserStore } from "../store/userStore";

interface FormData {
  userName: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
  });

  const { mutate: loginMutate, isSuccess, isError, error } = useLogin();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setFormData({
      ...formData,
      [e.target.name!]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    loginMutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setUser({ userName: formData.userName, password: formData.password }); // Store the user data in zustand
      // const userData = {
      //   userName: formData.userName,
      //   password: formData.password,
      // };
      // // Lưu thông tin người dùng vào localStorage
      // localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [formData, isSuccess, router, setUser]);

  return (
    <Box maxWidth={900} mx="auto" mt={4} p={2}>
      <Container maxWidth="sm">
        <Typography color="primary" variant="h4" align="center" gutterBottom>
          ĐĂNG NHẬP TÀI KHOẢN
        </Typography>
        <Typography variant="body1" align="center" color="black" gutterBottom>
          Chào mừng bạn quay trở lại
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ email"
                fullWidth
                name="userName"
                value={formData?.userName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mật khẩu"
                fullWidth
                name="password"
                type="password"
                value={formData?.password}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "50%", marginTop: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography color="black" variant="body2">
                Bạn chưa có tài khoản?{" "}
                <Link href="/register" passHref>
                  <Button color="primary" variant="text">
                    Đăng ký ngay
                  </Button>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {openSnackbar && (
          <Alert
            severity="success"
            sx={{
              width: "100%",
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            onClose={() => setOpenSnackbar(false)}
          >
            Đăng nhập thành công 🎉🎉🎉
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default LoginPage;
