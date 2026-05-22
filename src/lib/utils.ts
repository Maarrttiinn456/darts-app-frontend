import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTournamentName = (date: Date): string =>
    `Turnaj ${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;

export const formatDate = (iso?: string | null): string | null => {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};
