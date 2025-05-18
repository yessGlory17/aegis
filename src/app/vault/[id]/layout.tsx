"use client";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";


function VaultLayout({ children }: { children: React.ReactNode }) {
  return (
   <Box flexGrow={1}>
    {children}
   </Box>
  );
}
export default VaultLayout;
