import MuiCheckbox, {
  CheckboxProps as MUICheckboxProps,
} from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { FormElementProps } from "../type";
import { ElementContainer } from "../styled";
import { FormLabel } from "@mui/material";

type CheckboxProps = FormElementProps & MUICheckboxProps;

function Checkbox({ id, label, hideLabel, rules, ...others }: CheckboxProps) {
  const form = useFormContext();

  const { control } = form;

  return (
    <ElementContainer sx={{ flexDirection:"row", alignItems:"center" }}>
      {!hideLabel && <FormLabel>{label}</FormLabel>}
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({ field }) => (
          <MuiCheckbox
            {...field}
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value ?? ""}
            {...others}
          />
        )}
      />
    </ElementContainer>
  );
}

export default Checkbox;
