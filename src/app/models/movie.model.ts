export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Genre?: string;
  Director?: string;
  Plot?: string;
  Actors?: string;
  Runtime?: string;
  Ratings?: { Source: string; Value: string }[];
}
