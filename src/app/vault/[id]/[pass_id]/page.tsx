"use client";
import DateRange from "@mui/icons-material/DateRange";
import Key from "@mui/icons-material/Key";
import Mail from "@mui/icons-material/Mail";
import { Avatar, Box, Divider, Grid, Paper, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import PasswordViewer from "~/components/PasswordViewer";
import { useDialog, withDialogProvider } from "~/context/dialog/Context";
import GetPassword from "~/services/vault/queries/GetPassword";
import { GET_PASSWORDS_KEY } from "~/services/vault/queries/GetPasswords";

const Container = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey["200"]}`,
  boxShadow: "none",
}));

function Password({
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
    <Grid container>
      <Grid size={12}>
        <Container>
          <Box p={3} display="flex" flexDirection="row" alignItems="center">
            <Avatar
              src={`https://www.google.com/s2/favicons?domain=${password?.data?.service}&sz=128`}
            />
            <Box ml={2} display="flex" flexDirection="column">
              <Typography variant="caption">Title</Typography>
              <Typography>{password?.data?.title}</Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Grid container size={12} flexDirection="row">
        <Grid size={6} padding={4}>
          <Container>
            <Box p={2} display="flex" flexDirection="row" alignItems="center">
              <Mail color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Email or Username</Typography>
                <Typography>{password?.data?.username}</Typography>
              </Box>
            </Box>

            <Divider sx={({ palette }) => ({ border:`1px solid ${palette.grey['200']}` })} />

            <PasswordViewer vaultID={id} passwordID={pass_id} />
          </Container>

          <Container sx={{ mt: 2 }}>
            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <Mail color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Service</Typography>
                <Typography>{password?.data?.service}</Typography>
              </Box>
            </Box>
          </Container>

          <Container sx={{ mt: 2 }}>
            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <DateRange color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Created At</Typography>
                <Typography>{password?.data?.createdAt}</Typography>
              </Box>
            </Box>

            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <DateRange color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Updated At</Typography>
                <Typography>{password?.data?.updatedAt}</Typography>
              </Box>
            </Box>
          </Container>
        </Grid>
        
        <Grid size={6} padding={4}>
          <Container>
            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <Mail color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Email</Typography>
                <Typography>{password?.data?.username}</Typography>
              </Box>
            </Box>

            
          </Container>

          <Container sx={{ mt: 2 }}>
            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <Mail color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Service</Typography>
                <Typography>{password?.data?.service}</Typography>
              </Box>
            </Box>
          </Container>

          <Container sx={{ mt: 2 }}>
            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <DateRange color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Created At</Typography>
                <Typography>{password?.data?.createdAt}</Typography>
              </Box>
            </Box>

            <Box p={1} display="flex" flexDirection="row" alignItems="center">
              <DateRange color="primary" />
              <Box ml={2} display="flex" flexDirection="column">
                <Typography variant="caption">Updated At</Typography>
                <Typography>{password?.data?.updatedAt}</Typography>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withDialogProvider(Password);
