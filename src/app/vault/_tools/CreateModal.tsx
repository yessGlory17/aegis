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
import createVault, { CREATE_VAULT_MUTATION_KEY } from "~/services/vault/mutations/CreateVault";
import { GET_VAULTS_KEY } from "~/services/vault/queries/GetVaults";

function CreateModal() {
    const { handleSubmit } = useFormContext()
  const { isOpen, openDialog, closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useMutation({
    mutationKey: [CREATE_VAULT_MUTATION_KEY],
    mutationFn: createVault,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: [GET_VAULTS_KEY] });
    },
  });

  const create = async (data: FieldValues) => {
    console.log("FORM DATA: ", data);
    await createWorkspaceMutation.mutate({
      title: data?.workspaceTitle,
      description: data?.workspaceDescription,
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
      <DialogTitle id="alert-dialog-title">Create Workspace</DialogTitle>
      <DialogContent>
        <Input id="workspaceTitle" label="Name" size="small" />
        <Input id="workspaceDescription" label="Description" />
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
