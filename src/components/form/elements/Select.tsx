import { Controller, useFormContext } from "react-hook-form";
import { ElementContainer } from "../styled";
import MUISelect, { SelectProps as MUISelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormElementProps } from "../type";
import { FormLabel } from "@mui/material";

type SelectItem = {
  label: string;
  value: number | string;
};

type SelectProps = FormElementProps &
  MUISelectProps & {
    items: SelectItem[];
  };

function Select({
  id,
  label,
  hideLabel,
  items,
  rules,
  ...others
}: SelectProps) {
  const form = useFormContext();

  const { control } = form;

  return (
    <ElementContainer>
      {hideLabel && <FormLabel>{label}</FormLabel>}
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <MUISelect
              size="small"
              {...field}
              value={field.value ?? ""}
              {...others}
            >
              {items?.map((item) => (
                <MenuItem value={item.value ?? ""}>{item.label}</MenuItem>
              ))}
            </MUISelect>
          );
        }}
      />
    </ElementContainer>
  );
}

export default Select;
