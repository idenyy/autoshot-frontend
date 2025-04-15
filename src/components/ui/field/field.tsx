import { Text, TextInput, View } from "react-native";
import { IField } from "@/components/ui/field/field.interface";
import { Controller } from "react-hook-form";
import { clsx as cn } from "clsx";

const Field = <T extends Record<string, any>>({
  control,
  name,
  rules,
  className,
  ...rest
}: IField<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {error && (
            <Text className="w-full px-4 text-left text-red-500">
              {error.message}
            </Text>
          )}
          <View
            className={cn(
              "bg-gray-100 w-full rounded-2xl border my-1.5",
              error ? "border-red-500" : "border-transparent",
            )}
            style={{ minHeight: 60 }}
          >
            <TextInput
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={(value || "").toString()}
              className="text-gray-900 text-base px-5 flex-grow"
              placeholderTextColor="#7C8BA0"
              {...rest}
            />
          </View>
        </>
      )}
      name={name}
    />
  );
};

export default Field;
