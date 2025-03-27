"use client";

import TransactionDetail from "@/components/TransactionDetail";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "Hà Nội, Việt Nam",
    password: "password123",
  });

  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenModal = (value: any) => {
    setSelectedTransaction(value);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  // Dữ liệu giả lịch sử giao dịch
  const transactions = [
    {
      id: 1,
      orderId: "#1001",
      date: "2024-03-20",
      status: "Hoàn thành",
      total: "1,200,000đ",
    },
    {
      id: 2,
      orderId: "#1002",
      date: "2024-03-22",
      status: "Đang xử lý",
      total: "850,000đ",
    },
    {
      id: 3,
      orderId: "#1003",
      date: "2024-03-25",
      status: "Hủy",
      total: "430,000đ",
    },
  ];

  // Hàm xử lý cập nhật thông tin cá nhân
  const handleUpdateInfo = () => {
    setEditMode(!editMode);
    if (editMode) {
      console.log("Cập nhật thông tin:", user);
      // Gọi API cập nhật thông tin ở đây
    }
  };

  // Hàm xử lý đổi mật khẩu
  const handleUpdatePassword = () => {
    setEditPassword(!editPassword);
    if (editPassword) {
      console.log("Cập nhật mật khẩu:", user.password);
      // Gọi API đổi mật khẩu ở đây
    }
  };

  // Cấu hình cột cho DataGrid
  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Mã đơn hàng", flex: 1 },
    { field: "date", headerName: "Ngày đặt", flex: 1 },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (params) => {
        let color = "gray";
        if (params.value === "Hoàn thành") color = "green";
        if (params.value === "Đang xử lý") color = "orange";
        if (params.value === "Hủy") color = "red";
        return <Typography color={color}>{params.value}</Typography>;
      },
    },
    { field: "total", headerName: "Tổng tiền", flex: 1 },

    {
      field: "actions",
      headerName: "Thao tác",
      width: 100,
      align: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: any) => (
        <IconButton
          color="primary"
          onClick={() => handleOpenModal(params?.row)}
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];

  return (
    <Box maxWidth={900} mx="auto" mt={4} p={2}>
      <Typography color="primary" variant="h4" fontWeight="bold" gutterBottom>
        Tài khoản của tôi
      </Typography>

      {/* Thông tin cá nhân */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Thông tin cá nhân
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mật khẩu */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mật khẩu
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                disabled={!editPassword}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lịch sử giao dịch */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lịch sử giao dịch
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={transactions}
              columns={columns}
              pageSizeOptions={[5]}
              pagination
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Các nút chức năng */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quản lý tài khoản
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color={editPassword ? "success" : "primary"}
                fullWidth
                onClick={handleUpdatePassword}
              >
                {editPassword ? "Lưu mật khẩu" : "Đổi mật khẩu"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color={editMode ? "success" : "primary"}
                fullWidth
                onClick={handleUpdateInfo}
              >
                {editMode ? "Lưu thông tin" : "Cập nhật thông tin"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="text" color="error" fullWidth>
                Xóa tài khoản
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TransactionDetail
        open={openModal}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </Box>
  );
};

export default AccountPage;
