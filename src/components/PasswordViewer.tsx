"use client";
import Key from "@mui/icons-material/Key";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import decrypt, { DECRYPT_MUTATION_KEY } from "~/services/vault/mutations/Decrypt";

type PasswordViewerProps = {
    vaultID: string;
    passwordID: string;
}

function PasswordViewer({ vaultID, passwordID }: PasswordViewerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [decrypted, setDecrypted] = useState<string | null>(null);

  const decryptMutation = useMutation({
    mutationKey:[DECRYPT_MUTATION_KEY],
    mutationFn: decrypt,
    onSuccess(data) {
      setDecrypted(data?.data?.password)
    },
  })

  const handleClick = async () => {
    if(open){
        setOpen(!open)
    }else{
        setOpen(!open)
        await decryptMutation.mutate({ vaultID, passwordID });
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

      <IconButton loading={decryptMutation.isPending} onClick={handleClick}>
        {open ? <VisibilityOffIcon/> : <VisibilityIcon color="warning" />}
      </IconButton>
    </Box>
  );
}

export default PasswordViewer;
