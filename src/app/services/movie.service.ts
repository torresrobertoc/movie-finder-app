import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = `http://www.omdbapi.com/?apikey=${environment.omdbApiKey}`;
  private favorites: any[] = [];
  
  constructor(private http: HttpClient) { }

  // Search for movies by title
  searchMovies(query: string): Observable<Movie[]> {
    
    if (!query.trim()) {
      return of([] as Movie[]);
    }

    return this.http.get<{ Search: Movie[] }>(`${this.apiUrl}&s=${encodeURIComponent(query)}`).pipe(
      map(response => response.Search || []),
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return of([] as Movie[]);
      })
    );
  }

  // Fetch movie details by ID
  getMovieDetails(id: string): Observable<Movie> {
    const url =`${this.apiUrl}&i=${encodeURIComponent(id)}`;
    return this.http.get<Movie>(url).pipe(
      catchError((error) => {
        console.error('Error fetching movie details:', error);
        return of(undefined as any);
      })
    );
  }

  addToFavorites(movie: any) {
    // Check if the movie is already in the favorites list
    if (!this.favorites.find(f => f.imdbID === movie.imdbID)) {
      this.favorites.push(movie);
      console.log('Added to Favorites:', movie);
    }
    else {
      console.log('Movie already in Favorites');
    }
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  removeFromFavorites(movie: any) {
    this.favorites = this.favorites.filter(f => f.imdbID !== movie.imdbID);
    console.log('Removed from Favorites:', movie);
  }

  clearFavorites() {
    this.favorites = [];
    console.log('Cleared all favorites');
  }

}