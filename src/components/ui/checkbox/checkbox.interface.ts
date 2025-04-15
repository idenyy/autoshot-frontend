export interface ICheckbox {
  value: boolean;
  onValueChange: (value: boolean) => void;
  className?: string;
}
