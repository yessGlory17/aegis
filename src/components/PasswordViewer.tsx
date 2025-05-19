"use client";
import Key from "@mui/icons-material/Key";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

type PasswordViewerProps = {
    vaultID: string;
    passwordID: string;
}

function PasswordViewer({ vaultID, passwordID }: PasswordViewerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [decrypted, setDecrypted] = useState<string | null>(null);

  const handleClick = async () => {
    if(open){
        setOpen(!open)
    }else{
        setOpen(!open)
        const res = await fetch(`/api/vault/${vaultID}/password/${passwordID}/decrypt`, {
            method:"POST",
            body: JSON.stringify({
                vault: vaultID,
                password: passwordID
            })
        })
        const response = await res.json();

        console.log("DECRTYPED DATA: ", response?.data?.password);
        setDecrypted(response?.data?.password);

    }
  }

  return (
    <Box p={1} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
      <Box display="flex" flexDirection="row" alignItems="center">
        <Key color="primary" />
        <Box ml={2} display="flex" flexDirection="column">
          <Typography variant="caption">Password</Typography>
          <Typography>{!!decrypted && open ? decrypted : "••••••••••••••"}</Typography>
        </Box>
      </Box>

      <IconButton onClick={handleClick}>
        {open ? <VisibilityOffIcon/> : <VisibilityIcon color="warning" />}
      </IconButton>
    </Box>
  );
}

export default PasswordViewer;
