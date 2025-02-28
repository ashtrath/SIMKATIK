import apiClient from "~/lib/apiClient";
import type { Employee } from "../types";
import type { CreateEmployeeSchema, UpdateEmployeeSchema } from "../validator";

const EmployeeService = {
    getAllEmployees: async (): Promise<Employee[]> => {
        const { data } = await apiClient.get("/admin/karyawan");
        return data;
    },
    getEmployee: async (id: number): Promise<Employee> => {
        const { data } = await apiClient.get(`/admin/karyawan/${id}`);
        return data;
    },
    createEmployee: async ({ ...input }: CreateEmployeeSchema): Promise<Employee> => {
        const { data } = await apiClient.post("/admin/karyawan", { ...input });
        return data;
    },
    updateEmployee: async (id: number, { ...input }: UpdateEmployeeSchema): Promise<Employee> => {
        const { data } = await apiClient.put(`/admin/karyawan/${id}`, { ...input });
        return data;
    },
    deleteEmployee: async (id: number): Promise<void> => {
        await apiClient.delete(`/admin/karyawan/${id}`);
    },
};

export default EmployeeService;
