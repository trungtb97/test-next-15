/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import useRegister from "./api/useRegister";

interface FormData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  role: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [emailExists, setEmailExists] = useState(false); // Trạng thái kiểm tra email
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái khi đang gửi đăng ký
  const [emailCheckTimeout, setEmailCheckTimeout] = useState<any>(null); // Để lưu trữ timeout
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi kiểm tra email
  const { mutate: registerMutate, isSuccess, isError, error } = useRegister(); // Custom Hook để đăng ký
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    role: "",
  });

  // Kiểm tra xem email đã tồn tại hay chưa
  const checkEmailExist = async (email: string) => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/checkEmailExist/${email}`
      );
      if (response.data.message === "Email already existed in system") {
        setEmailExists(true); // Nếu email tồn tại, cập nhật trạng thái
      } else {
        setEmailExists(false); // Nếu email không tồn tại, cho phép đăng ký
      }
    } catch (error) {
      console.log("Error checking email:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setFormData({
      ...formData,
      [e.target.name!]: e.target.value,
    });
    // Nếu có timeout cũ, xóa nó
    if (emailCheckTimeout) {
      clearTimeout(emailCheckTimeout);
    }

    // Đặt timeout mới để gọi API sau 3 giây
    if (e.target.name === "email") {
      const timeout = setTimeout(() => {
        checkEmailExist(e.target.value);
      }, 3000); // 3000 ms = 3 giây
      setEmailCheckTimeout(timeout); // Lưu lại timeout
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    registerMutate(formData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/"); // Redirect to homepage after successful registration
      }, 2000);
    }
  }, [isSuccess, router]);

  return (
    <Box maxWidth={900} mx="auto" mt={4} p={2}>
      <Container maxWidth="lg">
        <Typography color="primary" variant="h4" align="center" gutterBottom>
          ĐĂNG KÝ TÀI KHOẢN
        </Typography>
        <Typography variant="body1" align="center" color="black" gutterBottom>
          Trở thành khách hàng mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                helperText={
                  emailExists ? "Email đã tồn tại trong hệ thống" : ""
                }
                error={emailExists}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                fullWidth
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading || emailExists === true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                fullWidth
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                disabled={isLoading || emailExists === true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
                disabled={isLoading || emailExists === true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                fullWidth
                required
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
                margin="normal"
                disabled={isLoading || emailExists === true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData?.role}
                  onChange={(e: any) => handleChange(e)}
                  disabled={isLoading || emailExists === true}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="staff">Nhân viên</MenuItem>
                  <MenuItem value="manager">Quản lý</MenuItem>
                </Select>
              </FormControl>
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
                style={{ width: "33%" }}
                sx={{ marginTop: 2 }}
                disabled={isSubmitting} // Disable nút khi email đã tồn tại, các trường thiếu hoặc đang gửi yêu cầu
              >
                {isSubmitting ? "Đang đăng ký..." : "ĐĂNG KÝ TÀI KHOẢN"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Hiển thị thông báo sau khi đăng ký thành công */}
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
            Đăng ký thành công!
          </Alert>
        )}

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography color="black" variant="body2">
            Đã có tài khoản?{" "}
            <Button color="primary" href="/login">
              Đăng nhập
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
