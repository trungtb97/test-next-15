"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Transaction {
  orderId: string;
  date: string;
  status: string;
  total: string;
  products: Product[];
}

interface TransactionDetailDialogProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailDialog: React.FC<TransactionDetailDialogProps> = ({
  open,
  onClose,
  transaction,
}) => {
  if (!transaction) return null;

  // Cấu hình cột cho DataGrid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Tên sản phẩm", flex: 2 },
    { field: "price", headerName: "Giá", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết giao dịch</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Mã đơn hàng:</strong> {transaction.orderId}
          </Typography>
          <Typography variant="body1">
            <strong>Ngày đặt:</strong> {transaction.date}
          </Typography>
          <Typography variant="body1">
            <strong>Trạng thái:</strong>{" "}
            <span
              style={{
                color:
                  transaction.status === "Hoàn thành"
                    ? "green"
                    : transaction.status === "Đang xử lý"
                    ? "orange"
                    : "red",
              }}
            >
              {transaction.status}
            </span>
          </Typography>
          <Typography variant="body1">
            <strong>Tổng tiền:</strong> {transaction.total}
          </Typography>
        </Box>

        {/* DataGrid hiển thị danh sách sản phẩm */}
        <Typography variant="h6" gutterBottom>
          Danh sách sản phẩm
        </Typography>
        <Box sx={{ height: 250, width: "100%" }}>
          <DataGrid
            rows={transaction.products}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailDialog;
