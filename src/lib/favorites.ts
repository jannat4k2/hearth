import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      slugs: [],
      has: (slug) => get().slugs.includes(slug),
      toggle: (slug) =>
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((s) => s !== slug)
            : [...state.slugs, slug],
        })),
    }),
    { name: "hearth-saved" },
  ),
);
