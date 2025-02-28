import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getInitials = (input: string, maxInitials = 2) => {
    const names = input
        .trim()
        .split(/\s+/)
        .filter((name) => name.length > 0);

    if (names.length === 0) return "";

    // Handle single name case
    if (names.length === 1) {
        return names[0].slice(0, maxInitials).toUpperCase();
    }

    const initials = [];
    const count = Math.min(maxInitials, names.length);

    // When names exceed maxInitials, combine first (max-1) and last initials
    if (names.length > maxInitials) {
        for (let i = 0; i < maxInitials - 1; i++) {
            initials.push(names[i][0]);
        }
        initials.push(names[names.length - 1][0]);
    } else {
        for (let i = 0; i < count; i++) {
            initials.push(names[i][0]);
        }
    }

    return initials.join("").toUpperCase();
};
