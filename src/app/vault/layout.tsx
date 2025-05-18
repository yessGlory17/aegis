import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Header from "~/components/layout/Header";
import Sidebar from "~/components/layout/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh">
      <Header />
      <Box display="flex" flexDirection="row">
      <Sidebar />
      {children}
      </Box>
    </Box>
  );
}

export default Layout