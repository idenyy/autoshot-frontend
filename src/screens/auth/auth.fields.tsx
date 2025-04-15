import { Control } from "react-hook-form";
import { IAuthData } from "@/types/auth.interface";
import Field from "@/components/ui/field/field";
import { Pressable, Text } from "react-native";
import { validationPatterns } from "@/screens/auth/auth.regex";

interface IAuthFields {
  control: Control<IAuthData>;
  isRegister: boolean;
}

const AuthFields: React.FC<IAuthFields> = ({ control, isRegister }) => {
  return (
    <>
      {isRegister && (
        <Field<IAuthData>
          control={control}
          name="name"
          placeholder="Name"
          returnKeyType="next"
          rules={{
            required: validationPatterns.name.messages.required,
            pattern: {
              value: validationPatterns.name.pattern,
              message: validationPatterns.name.messages.invalid,
            },
            minLength: {
              value: 2,
              message: validationPatterns.name.messages.minLength,
            },
            maxLength: {
              value: 30,
              message: validationPatterns.name.messages.maxLength,
            },
          }}
          keyboardType="default"
        />
      )}
      <Field<IAuthData>
        control={control}
        name="email"
        placeholder="Email"
        returnKeyType="next"
        rules={{
          required: validationPatterns.email.messages.required,
          pattern: {
            value: validationPatterns.email.pattern,
            message: validationPatterns.email.messages.invalid,
          },
        }}
        keyboardType="email-address"
      />
      <Field<IAuthData>
        control={control}
        name="password"
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry
        rules={{
          required: validationPatterns.password.messages.required,
          // pattern: {
          //   value: validationPatterns.password.pattern,
          //   message: validationPatterns.password.messages.invalid,
          // },
          minLength: {
            value: 8,
            message: validationPatterns.password.messages.minLength,
          },
        }}
      />
      {!isRegister && (
        <Pressable>
          <Text className="text-xs text-[#7C8BA0] self-end mb-8 mt-1 px-3">
            Forget Password?
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default AuthFields;
