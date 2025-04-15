import { useQuery } from "@tanstack/react-query";
import { SupplierService } from "@/services/supplier.service";

export const useGetAllSuppliers = () => {
  const { data: suppliers, isLoading } = useQuery({
    queryKey: ["get suppliers"],
    queryFn: () => SupplierService.getAll(),
    select: (data) => data,
  });

  return { suppliers, isLoading };
};
