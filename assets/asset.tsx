// // AuthProvider
// import { createContext, PropsWithChildren, useEffect, useState } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import { IUser } from "@/types/user.interface";
// import {
//   IContext,
//   TypeUserState,
// } from "@/providers/auth/auth-provider.interface";
// import { IMenuItem } from "@/components/ui/layout/bottom-menu/menu.interface";
// import { useAuth } from "@/hooks/useAuth";
// import { menuItems } from "@/components/ui/layout/bottom-menu/menu.data";
//
// export const AuthContext = createContext<IContext>({
//   user: null,
//   setUser: () => {},
//   isAuth: false,
// });
//
// const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
//   const [user, setUser] = useState<TypeUserState>(null);
//   const [isAuth, setIsAuth] = useState(false);
//   const [appReady, setAppReady] = useState(false);
//
//   useEffect(() => {
//     let isMounted = true;
//
//     const checkAccessToken = async () => {
//       try {
//         await SplashScreen.preventAutoHideAsync();
//
//         // Тут має бути логіка перевірки токена
//         // Наприклад:
//         // const storedUser = await SecureStore.getItemAsync('user');
//         // if (storedUser) {
//         //   const parsedUser = JSON.parse(storedUser) as IUser;
//         //   if (isMounted) {
//         //     setUser(parsedUser);
//         //     setIsAuth(true);
//         //   }
//         // }
//
//         // Тимчасовий приклад для демонстрації:
//         const mockUser: IUser = {
//           id: "1",
//           name: "John Doe",
//           email: "user@example.com",
//           role: "CLIENT", // або "MANAGER"
//           // інші поля користувача
//         };
//
//         if (isMounted) {
//           setUser(mockUser);
//           setIsAuth(true);
//         }
//       } catch (error) {
//         console.error("Auth check failed:", error);
//       } finally {
//         if (isMounted) {
//           setAppReady(true);
//           await SplashScreen.hideAsync();
//         }
//       }
//     };
//
//     checkAccessToken();
//
//     return () => {
//       isMounted = false;
//     };
//   }, []);
//
//   if (!appReady) {
//     return null;
//   }
//
//   return (
//     <AuthContext.Provider value={{ user, setUser, isAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export default AuthProvider;
//
// export const filterMenuItems = (
//   items: IMenuItem[],
//   isAuth: boolean,
//   isManager: boolean = false,
// ): IMenuItem[] => {
//   return items.filter((item) => {
//     // Якщо пункт вимагає адмінки, але користувач не адмін - приховуємо
//     if (item.isManager && !isManager) return false;
//
//     // Якщо пункт вимагає авторизації, але користувач не увійшов - приховуємо
//     if (item.isAuth && !isAuth) return false;
//
//     // В інших випадках - показуємо
//     return true;
//   });
// };
//
// const { isAuth, user } = useAuth(); // Припустимо, що є хук useAuth
//
// const filteredItems = filterMenuItems(
//   menuItems,
//   isAuth,
//   user?.role === "MANAGER", // Передаємо true/false в залежності від ролі
// );
