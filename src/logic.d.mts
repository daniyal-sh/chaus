export const hours: {
  day: string;
  open: number;
  close: number;
  label: string;
}[];
export function shopStatus(date?: Date): {
  open: boolean;
  day: string;
  label: string;
};
export function money(value: number): string;
export function filterMenu<
  T extends {
    id: string;
    name: string;
    description: string;
    category: string;
    iced?: boolean;
    hot?: boolean;
    caffeineFree?: boolean;
  },
>(
  items: T[],
  category: string,
  query: string,
  preference: string,
  favorites?: string[],
): T[];
