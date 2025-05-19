"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { use, useMemo } from "react";
import { useDialog, withDialogProvider } from "~/context/dialog/Context";
import GetPasswords, {
  GET_PASSWORDS_KEY,
} from "~/services/vault/queries/GetPasswords";
import GetVault, { GET_VAULT_KEY } from "~/services/vault/queries/GetVault";
import CreatePasswordModal from "./_tools/CreatePasswordModal";

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
                      
                      <Link color="primary" href={`/vault/${id}/${row.id}`}>{row.title}</Link>
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
}

export default withDialogProvider(Vault);
