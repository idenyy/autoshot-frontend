import { useContext } from "react";
import { AuthContext } from "@/providers/auth/auth.provider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  const { user, setUser } = context;

  const isManager = user?.role === "MANAGER";

  return {
    user,
    setUser,
    isManager,
  };
};
