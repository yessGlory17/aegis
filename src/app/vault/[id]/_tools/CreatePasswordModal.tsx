import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
  import { useEffect, useState } from "react";
  import { FieldValues, useFormContext } from "react-hook-form";
  import Input from "~/components/form/elements/Input";
  import withForm from "~/components/form/hoc/withForm";
  import { useDialog } from "~/context/dialog/Context";
import createPassword, { CREATE_PASSWORD_MUTATION_KEY } from "~/services/vault/mutations/CreatePassword";
  import createVault, { CREATE_VAULT_MUTATION_KEY } from "~/services/vault/mutations/CreateVault";
import { GET_PASSWORDS_KEY } from "~/services/vault/queries/GetPasswords";
  import { GET_VAULTS_KEY } from "~/services/vault/queries/GetVaults";
  
  function CreateModal({ id }: { id: string; }) {
      const { handleSubmit } = useFormContext()
    const { isOpen, openDialog, closeDialog } = useDialog();
    const queryClient = useQueryClient();
    const createWorkspaceMutation = useMutation({
      mutationKey: [CREATE_PASSWORD_MUTATION_KEY],
      mutationFn: createPassword,
      onSuccess() {
        queryClient.refetchQueries({ queryKey: [GET_PASSWORDS_KEY] });
      },
    });
  
    const create = async (data: FieldValues) => {
      console.log("FORM DATA: ", data);
      await createWorkspaceMutation.mutate({
        title: data?.title,
        service: data?.service,
        password: data?.password,
        username: data?.username,
        vaultID: id
      });
      closeDialog();
    };
  
    return (
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Password</DialogTitle>
        <DialogContent>
          <Input id="title" label="Title" size="small" />
          <Input id="service" label="Service" />
          <Input id="username" label="Username" />
          <Input id="password" label="Password" />
        </DialogContent>
        <DialogActions
          sx={({ palette }) => ({ backgroundColor: palette.grey["200"] })}
        >
          <Button color="error" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            loading={createWorkspaceMutation.isPending}
            variant="contained"
            onClick={handleSubmit(create)}
            autoFocus
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default withForm(CreateModal);
  