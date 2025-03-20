"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
  open,
  onClose,
  product,
}) => {
  if (!product) return null;

  const columns: GridColDef[] = [
    { field: "key", headerName: "Thuộc tính", flex: 1 },
    { field: "value", headerName: "Chi tiết", flex: 2 },
  ];

  const rows = [
    { id: 1, key: "Tên sản phẩm", value: product.name },
    { id: 2, key: "Giá", value: product.price },
    { id: 3, key: "Danh mục", value: product.category },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thông tin sản phẩm</DialogTitle>
      <DialogContent>
        <Box sx={{ height: 200, width: "100%", mt: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            disableColumnMenu
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

export default ProductDetailDialog;
