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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Role"
                fullWidth
                name="role"
                value={formData.role}
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
      </Container>
    </Box>
  );
};

export default RegisterPage;
