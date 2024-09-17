import { MediaDTO, MovieDTO } from '@/@types/mediaDTO';
import { Api } from '@/shared/services/api-client';
import { create } from 'zustand';

interface State {
  items: MediaDTO;
  loading: boolean;
  error: boolean;
  fetchMedia: (params: string) => void;
  setItems: (data: MovieDTO[]) => void;
}

export const useMoviesStore = create<State>()((set) => ({
  items: {
    docs: [],
  },
  loading: true,
  error: false,
  setItems: (data) => {
    set((prevState) => ({
      items: prevState.items,
      ...data,
    }));
  },
  fetchMedia: async (params) => {
    try {
      set({ loading: true, error: false });
      const items = await Api.movies.getAll(params);
      set({ items });
    } catch (error) {
      set({ error: true });
      console.log('Error [FETCH_MEDIA]', error);
    } finally {
      set({ loading: false });
    }
  },
}));
