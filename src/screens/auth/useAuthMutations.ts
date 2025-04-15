import { UseFormReset } from "react-hook-form";
import { IAuthData } from "@/types/auth.interface";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";
import { useMemo } from "react";

export const useAuthMutations = (reset: UseFormReset<IAuthData>) => {
  const { setUser } = useAuth();

  const { mutate: registerSync, isPending: isRegisterLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ email, password, name }: IAuthData) =>
      AuthService.main("register", email, password, name),
    onSuccess(data) {
      reset();
      setUser(data.user);
    },
    onError(error: any) {
      console.log(error);
    },
  });

  const { mutate: loginSync, isPending: isLoginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: IAuthData) =>
      AuthService.main("login", email, password),
    onSuccess(data) {
      reset();
      setUser(data.user);
    },
    onError(error: any) {
      console.log(error);
    },
  });

  return useMemo(
    () => ({
      registerSync,
      loginSync,
      isLoading: isRegisterLoading || isLoginLoading,
    }),
    [isRegisterLoading, isLoginLoading],
  );
};
