"use client";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { use, useMemo } from "react";
import GetVault, { GET_VAULT_KEY } from "~/services/vault/queries/GetVault";
import AddIcon from "@mui/icons-material/Add";
import { useDialog, withDialogProvider } from "~/context/dialog/Context";
import CreatePasswordModal from "./_tools/CreatePasswordModal";
import GetPasswords, {
  GET_PASSWORDS_KEY,
} from "~/services/vault/queries/GetPasswords";
import KeyIcon from "@mui/icons-material/Key";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Vault({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { openDialog } = useDialog();

  const { data: passwords } = useQuery({
    queryKey: [GET_PASSWORDS_KEY],
    queryFn: () => GetPasswords(id),
  });

  const { data } = useQuery({
    queryKey: [GET_VAULT_KEY],
    queryFn: () => GetVault(id),
  });

  const rows = useMemo(() => {
    return passwords?.data?.map((pass) => ({
      id: pass._id,
      title: pass.title,
      service: pass.service,
      createdAt: pass.createdAt,
      updatedAt: pass.updatedAt,
    }));
  }, [passwords]);

  const columns: GridColDef[] = [
    {
      field: "ico",
      width: 64,
      renderHeader(params) {
        return <></>;
      },
      renderCell(params) {
        return (
          <Avatar
            src={`https://www.google.com/s2/favicons?domain=${params.row.service}&sz=128`}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "service",
      headerName: "Service",
      flex: 5,
      renderCell(params) {
        return (
          <Box
            display="flex"
            height="100%"
            flexDirection="row"
            alignItems="center"
          >
            <Typography sx={({ palette }) => ({ color: palette.grey["500"] })}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      width: 200,
      headerName: "Created At",
    },
    {
      field: "updatedAt",
      width: 200,
      headerName: "Updated At",
    },
  ];

  return (
    <Box flexGrow={1}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        p={2}
      >
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/vault">
            Vaults
          </Link>
          <Typography sx={{ color: "primary" }}>{data?.data?.title}</Typography>
        </Breadcrumbs> */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column">
            <Typography color="primary" variant="h6">
              {data?.data?.title}
            </Typography>
            <Typography
              sx={({ palette }) => ({ color: palette.grey["600"] })}
              variant="body1"
            >
              {data?.data?.description}
            </Typography>
          </Box>
          {/* <IconButton onClick={openDialog}>
            <AddIcon />
          </IconButton> */}
          <Button
            variant="contained"
            onClick={openDialog}
            startIcon={<AddIcon />}
          >
            Create Password
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box p={2} sx={{ width: "100%" }}>
        {/* <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnResize
          disableColumnSorting
          sx={({ palette }) => ({
            border: `1px solid ${palette.grey['200']}`,
            padding:2,
            "& > .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          })}
        /> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Service</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar
                        src={`https://www.google.com/s2/favicons?domain=${row.service}&sz=128`}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.service}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CreatePasswordModal id={id} />
    </Box>
  );

  return (
    <Grid
      size={3}
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
            {data?.data?.title}
          </Typography>
          <Typography
            sx={({ palette }) => ({ color: palette.grey["600"] })}
            variant="body1"
          >
            {data?.data?.description}
          </Typography>
        </Box>
        <IconButton onClick={openDialog}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {passwords?.data?.map((pass) => (
          <ListItem key={pass._id} disablePadding>
            <ListItemButton href={`/vault/${pass.vault}/${pass._id}`}>
              <ListItemIcon>
                <Avatar
                  src={`https://www.google.com/s2/favicons?domain=${pass.service}&sz=128`}
                />
              </ListItemIcon>
              <ListItemText primary={pass.title} secondary={pass.service} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CreatePasswordModal id={id} />
    </Grid>
  );
}

export default withDialogProvider(Vault);
