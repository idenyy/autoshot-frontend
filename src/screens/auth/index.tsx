import { Image, Keyboard, Pressable, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IAuthData } from "@/types/auth.interface";

import KeyboardView from "@/components/ui/keyboard-view";
import Checkbox from "@/components/ui/checkbox/checkbox";
import Loader from "@/components/ui/loader";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuthMutations } from "@/screens/auth/useAuthMutations";
import AuthFields from "@/screens/auth/auth.fields";
import Button from "@/components/ui/buttons/Button";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);

  const { control, handleSubmit, reset } = useForm<IAuthData>();

  const { registerSync, loginSync, isLoading } = useAuthMutations(reset);

  const toggleAuthMode = () => {
    Keyboard.dismiss();
    reset();
    setIsRegister((prev) => !prev);
  };

  const onSubmit = (data: IAuthData) => {
    Keyboard.dismiss();
    if (isRegister) registerSync(data);
    else loginSync(data);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loader />
      </View>
    );
  }

  return (
    <KeyboardView className="px-6 mt-16">
      <View className="flex-1 justify-center">
        <View className="flex flex-col items-center justify-center">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-[100px] h-[100px] bg-transparent"
            resizeMode="contain"
          />

          <Text className="text-3xl font-semibold text-blue-600 mt-7 mb-4">
            {isRegister ? "Sign Up" : "Welcome Back"}
          </Text>
          <Text className="text-gray-700 font-normal text-sm text-center px-4">
            {isRegister
              ? "Join now to unlock exclusive discounts and personalized services!"
              : "Log in to access your account and continue your experience"}
          </Text>
        </View>

        <View className="mt-8 mb-4">
          <View className="w-full flex-row space-x-6">
            <Pressable
              className="flex-1 flex-row justify-center items-center bg-gray-100 rounded-2xl p-5"
              onPress={() => Keyboard.dismiss()}
            >
              <AntDesign name="github" size={24} color="black" />
              <Text className="text-base text-gray-900 font-medium text-center ml-4">
                Github
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 flex-row justify-center items-center bg-gray-100 rounded-2xl p-5"
              onPress={() => Keyboard.dismiss()}
            >
              <AntDesign name="google" size={24} color="black" />
              <Text className="text-base text-gray-900 font-medium text-center ml-3">
                Google
              </Text>
            </Pressable>
          </View>

          <View className="flex flex-row items-center my-4">
            <View className="flex-grow h-px bg-gray-300" />
            <Text className="text-base font-normal text-gray-900 mx-4">Or</Text>
            <View className="flex-grow h-px bg-gray-300" />
          </View>

          <AuthFields control={control} isRegister={isRegister} />

          {isRegister && (
            <View className="flex flex-row items-start mb-8">
              <Checkbox
                value={isAgreed}
                onValueChange={setIsAgreed}
                className="mr-2 mt-1"
              />
              <Text className="text-gray-800 text-sm flex-1 flex-wrap">
                I'm agree to The{" "}
                <Text className="text-blue-500">Terms of Service</Text> and{" "}
                <Text className="text-blue-500">Privacy Policy</Text>
              </Text>
            </View>
          )}

          <Button
            handle={handleSubmit(onSubmit)}
            className={!isAgreed && isRegister ? "bg-gray-300" : "bg-blue-500"}
            isPending={isLoading}
          >
            <Text className="text-base font-medium text-white">
              {isRegister ? "Create Account" : "Sign In"}
            </Text>
          </Button>

          <View className="flex-row mt-4 mb-8">
            <Text className="text-gray-800">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </Text>
            <Pressable onPress={toggleAuthMode} className="ml-1">
              <Text className="text-blue-500 font-medium">
                {isRegister ? "Sign In" : "Sign Up"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardView>
  );
};

export default Auth;
