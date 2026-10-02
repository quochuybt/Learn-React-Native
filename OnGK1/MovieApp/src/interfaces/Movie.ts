export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCard {
  movie: Movie;
  layout?: "tile" | "row";
  onSelect: () => void;
}
