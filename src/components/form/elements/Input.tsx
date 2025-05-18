import {
  FormControl,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "../type";
import { ElementContainer } from "../styled";

type InputProps = FormElementProps & TextFieldProps;

function Input({ id, label, hiddenLabel,  rules, ...others }: InputProps) {
  const form = useFormContext();

  return (
    <ElementContainer>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={id}
        control={form.control}
        rules={rules}
        render={({ field: { ref, value, ...field } }) => {
          return (
            <TextField
              size="small"
              inputRef={ref}
              value={value ?? ""}
              {...field}
              {...others}
            />
          );
        }}
      />
    </ElementContainer>
  );
}

export default Input;
