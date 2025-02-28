import type { User } from "../auth/types";

export interface Employee extends Omit<User, "role"> {
    role: "Karyawan";
}
