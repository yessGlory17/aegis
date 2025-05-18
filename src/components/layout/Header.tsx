"use client";
import { Avatar, Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const session = useSession();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height={70}
      sx={({ palette }) => ({
        borderBottom: `1px solid ${palette.grey["200"]}`,
      })}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Image alt="aegis-logo" src="/aegis-logo.png" width={70} height={70} />
        <Typography variant="h4" sx={({ palette }) => ({ color: palette.primary.main })} >AEGIS</Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" mr={2}>
        <Avatar
          sx={({ palette }) => ({ backgroundColor: palette.primary.main })}
          variant="circular"
        >
          {session?.data?.user?.email?.split("")?.[0]?.toUpperCase()}
        </Avatar>
        <Typography ml={1}>{session?.data?.user?.email}</Typography>
      </Box>
    </Box>
  );
}

export default Header;
