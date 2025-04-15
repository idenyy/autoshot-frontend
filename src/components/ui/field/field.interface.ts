import { TextInputProps } from "react-native";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export interface IField<T extends FieldValues>
  extends Omit<TextInputProps, "onChange" | "onChangeText" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  className?: string;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
