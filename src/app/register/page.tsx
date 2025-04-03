/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useRegister from "./api/useRegister";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  role: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    role: "",
  });

  const router = useRouter();
  const { mutate: registerMutate, isSuccess, isError, error } = useRegister();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setFormData({
      ...formData,
      [e.target.name!]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutate(formData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isSuccess, router]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData?.role}
                  onChange={() => handleChange}
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
              >
                ĐĂNG KÝ TÀI KHOẢN
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography color="black" variant="body2">
            Đã có tài khoản?{" "}
            <Button color="primary" href="/login">
              Đăng nhập
            </Button>
          </Typography>
        </Box>
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
            onClose={handleCloseSnackbar}
          >
            Đăng ký thành công!
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default RegisterPage;
