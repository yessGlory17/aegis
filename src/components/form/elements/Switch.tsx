import { Controller, useFormContext } from "react-hook-form";
import { ElementContainer } from "../styled";
import { FormElementProps } from "../type";
import MUISwitch, { SwitchProps as MUISwitchProps } from "@mui/material/Switch";
import { FormLabel } from "@mui/material";

type SwitchProps = Omit<FormElementProps, "hideLabel"> &
  MUISwitchProps & {
    direction?: "row" | "column";
  };

function Switch({
  id,
  label,
  rules,
  direction = "row",
  ...others
}: SwitchProps) {
  const form = useFormContext();

  const { control } = form;

  return (
    <ElementContainer
      sx={{
        flexDirection: direction,
        ...(direction === "row" && { alignItems: "center" }),
      }}
    >
      <FormLabel>{label}</FormLabel>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <MUISwitch
            {...field}
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value ?? false}
            {...others}
          />
        )}
      />
    </ElementContainer>
  );
}

export default Switch;
