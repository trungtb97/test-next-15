/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu đến API
  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("https://your-api-url.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Gửi thất bại, vui lòng thử lại!");
      }
    } catch (error: any) {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
      <Grid container spacing={4}>
        {/* Cột trái - Form liên hệ */}
        <Grid item xs={12} md={6}>
          <Typography
            color="primary"
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            Liên hệ với chúng tôi
          </Typography>
          <TextField
            fullWidth
            label="Tên của bạn"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nội dung liên hệ"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7ED321",
              color: "white",
              mt: 2,
              "&:hover": { backgroundColor: "#6DBA1F" },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "XÁC NHẬN"}
          </Button>

          {success && (
            <Typography color="green" mt={2}>
              Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.
            </Typography>
          )}
        </Grid>

        {/* Cột phải - Thông tin liên hệ */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            THÔNG TIN LIÊN HỆ
          </Typography>
          <Typography color="black" variant="body1" sx={{ mt: 1 }}>
            <strong>Trụ sở chính:</strong> Số 1 ngõ 74 Trường Chinh, quận Đống
            Đa, TP Hà Nội
          </Typography>
          <Typography color="black" variant="body1" sx={{ mt: 1 }}>
            <strong>Địa chỉ:</strong> phường Hồ Sơn, thị xã Tam Đảo, tỉnh Vĩnh
            Phúc
          </Typography>
          <Typography color="black" variant="body1" sx={{ mt: 1 }}>
            <strong>Liên hệ trực tiếp:</strong> Bác sĩ Trần Bảo Trung – 0354156752
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ mt: 3 }}
          >
            THỜI GIAN LÀM VIỆC
          </Typography>
          <ul>
            <li>
              <Typography color="black" variant="body1">
                Thứ 2 – Thứ 6: 8h – 17h
              </Typography>
            </li>
            <li>
              <Typography color="black" variant="body1">
                Thứ 7: Nghỉ
              </Typography>
            </li>
            <li>
              <Typography color="black" variant="body1">
                Chủ nhật: Nghỉ
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
