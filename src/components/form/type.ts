import { UseControllerProps } from "react-hook-form";

export type FormElementProps = {
  id: string;
  label: string;
  rules?: UseControllerProps["rules"];
  hideLabel?: boolean;
};
