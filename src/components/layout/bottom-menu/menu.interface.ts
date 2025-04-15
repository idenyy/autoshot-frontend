import { TypeMaterialIconNames } from "@/types/icon.interface";
import { TypeRootStackParamList } from "@/navigation/navigation.types";
import { IUser } from "@/types/user.interface";

export interface IMenuItem {
  icon: TypeMaterialIconNames;
  title: string;
  path: keyof TypeRootStackParamList;
  isAuth?: boolean;
  isManager?: boolean;
}

export const filterMenuItems = (
  items: IMenuItem[],
  user: IUser | null,
  isManager: boolean = false,
): IMenuItem[] => {
  return items.filter((item) => {
    return !(item.isManager && !isManager);
  });
};

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void;
