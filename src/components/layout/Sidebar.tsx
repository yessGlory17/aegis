"use client";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import {
  DialogProvider,
  useDialog,
  withDialogProvider,
} from "~/context/dialog/Context";
import CreateModal from "~/app/vault/_tools/CreateModal";
import { useQuery } from "@tanstack/react-query";
import GetVaults, { GET_VAULTS_KEY } from "~/services/vault/queries/GetVaults";
import LockIcon from '@mui/icons-material/Lock';

const SidebarText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.grey["200"],
  "& > .MuiListItemText-secondary":{
    color: theme.palette.grey["300"]
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey["200"],
}));



function Sidebar() {
  const { openDialog } = useDialog();

  const { data } = useQuery({ queryKey: [GET_VAULTS_KEY], queryFn: GetVaults });

  return (
    <Box
      width={250}
      height="calc(100vh - 70px)"
      sx={({ palette }) => ({
        borderRight: `1px solid ${palette.grey["200"]}`,
        backgroundColor: "#0f172b",
      })}
    >
      <Box width="100%" p={1}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Title>Vaults</Title>
          <IconButton size="small" onClick={openDialog}>
            <AddIcon sx={({ palette }) => ({ color: palette.grey["200"] })} />
          </IconButton>
        </Box>
        <List dense>
          {data?.data?.map((vault) => (
            <ListItem key={vault._id} disablePadding>
              <ListItemButton href={`/vault/${vault._id}`}>
                <ListItemIcon>
                  <LockIcon
                    sx={({ palette }) => ({ color: palette.grey["200"] })}
                  />
                </ListItemIcon>
                <SidebarText primary={vault.title} secondary={vault.description} />
              </ListItemButton>
            </ListItem>
          ))}

        </List>
        <CreateModal />
      </Box>
    </Box>
  );
}

export default withDialogProvider(Sidebar);
