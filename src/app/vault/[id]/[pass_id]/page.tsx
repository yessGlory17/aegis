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
import { use } from "react";
import GetVault, { GET_VAULT_KEY } from "~/services/vault/queries/GetVault";
import AddIcon from "@mui/icons-material/Add";
import { useDialog, withDialogProvider } from "~/context/dialog/Context";
import GetPasswords, {
  GET_PASSWORDS_KEY,
} from "~/services/vault/queries/GetPasswords";
import KeyIcon from "@mui/icons-material/Key";
import CreatePasswordModal from "../_tools/CreatePasswordModal";
import GetPassword from "~/services/vault/queries/GetPassword";

function Vault({
  params,
}: {
  params: Promise<{ id: string; pass_id: string }>;
}) {
  const { pass_id, id } = use(params);
  const { openDialog } = useDialog();

  const { data: password } = useQuery({
    queryKey: [GET_PASSWORDS_KEY],
    queryFn: () => GetPassword({ id, pass_id }),
  });

  return (
    <Grid
      size={9}
      sx={({ palette }) => ({ border: `1px solid ${palette.grey["300"]}` })}
      flexDirection="row"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p={1}
        border="1px solid green"
      >
        <Box border="1px solid red">
          <Typography color="primary" variant="h6">
            {password?.data?.title}
          </Typography>
          <Typography
            sx={({ palette }) => ({ color: palette.grey["600"] })}
            variant="body1"
          >
            {password?.data?.service}
          </Typography>
        </Box>
        <IconButton onClick={openDialog}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <KeyIcon
                        sx={({ palette }) => ({ color: palette.grey["200"] })}
                      /> */}
              <Avatar
                src={`https://www.google.com/s2/favicons?domain=${password?.data.service}&sz=1024`}
              />
            </ListItemIcon>
            <ListItemText primary={password?.data.username} />
          </ListItemButton>
        </ListItem>
      </List>
      <CreatePasswordModal id={id} />
    </Grid>
  );
}

export default withDialogProvider(Vault);
