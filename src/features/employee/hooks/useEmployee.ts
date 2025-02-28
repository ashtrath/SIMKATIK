import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import EmployeeService from "../services/EmployeeService";
import type { Employee } from "../types";
import type { CreateEmployeeSchema, UpdateEmployeeSchema } from "../validator";

// TODO: Implement getEmployee method.
const useEmployee = () => {
    const queryClient = useQueryClient();

    const {
        data: employees,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Employee[]>({
        queryKey: ["employees"],
        queryFn: EmployeeService.getAllEmployees,
    });

    const {
        mutateAsync: createEmployee,
        isPending: isCreating,
        error: createError,
    } = useMutation({
        mutationFn: (input: CreateEmployeeSchema) => EmployeeService.createEmployee(input),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success(`Berhasil menambahkan karyawan ${data.nama_lengkap}!`);
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menambahkan karyawan.");
        },
    });

    const {
        mutateAsync: updateEmployee,
        isPending: isUpdating,
        error: updateError,
    } = useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateEmployeeSchema }) =>
            EmployeeService.updateEmployee(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("Berhasil memperbarui karyawan!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat memperbarui karyawan.");
        },
    });

    const {
        mutateAsync: deleteEmployee,
        isPending: isDeleting,
        error: deleteError,
    } = useMutation({
        mutationFn: (id: number) => EmployeeService.deleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("Berhasil menghapus karyawan!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menghapus karyawan.");
        },
    });

    return {
        employees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        isLoading: isFetching || isCreating || isUpdating || isDeleting,
        error: {
            employees: fetchError,
            createEmployee: createError,
            updateEmployee: updateError,
            deleteEmployee: deleteError,
        },
    };
};

export default useEmployee;
