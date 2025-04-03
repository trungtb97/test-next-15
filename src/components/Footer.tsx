"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box bgcolor="#dc4d4d" color="white" py={4} mt={2}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              textAlign={isMobile ? "center" : "left"}
            >
              <Typography variant="h6" fontWeight="bold">
                SHOP BÁN LINH KIỆN MÁY TÍNH
              </Typography>
              <Typography variant="body1">
                <strong>Trụ sở chính:</strong> S4.04 Smart City, Tây Mỗ, Nam Từ
                Liêm, Hà Nội
              </Typography>
              <Typography variant="body1">
                <strong>Giám đốc:</strong> Trần Bảo Trung - 035 415 6752
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> tranbaotrung2211@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" justifyContent="center">
              <iframe
                title="Google Maps"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.890497718226!2d105.8311599!3d21.0377845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9205736b15%3A0xd2f02091a4efb63b!2zTmfDtSA3NCDEkC4gVHLGsOG7nW5nIENoaW5oLCBRdeG6rW4gxJDhu5luZyBEYSwgVGjGsOG7nW5nIE5ow60sIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1710894351641!5m2!1svi!2s"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
