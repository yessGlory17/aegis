"use client";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import login, { LOGIN_MUTATION_KEY } from "~/services/task/mutations/Login";

function Login() {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const loginMutation = useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: login,
  });

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          width: 400,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography mb={5} variant="h6">
          Sign in to your account
        </Typography>
        <Box mb={4} width="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <TextField
            fullWidth
            size="small"
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            sx={{ marginTop: 2 }}
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          loading={loginMutation.isPending}
          onClick={() => loginMutation.mutate({ email, password })}
        >
          Sign in
        </Button>

        <Box display="flex" flexDirection="row" mt={4}>
          <Typography mr={1}>
            Not a member?
          </Typography>
          <Link color="primary" target="/register">
            Register
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
