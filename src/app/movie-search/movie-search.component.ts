import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  imports: [FormsModule, NgFor],
  standalone: true,
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})

export class MovieSearchComponent {

  query: string = '';
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) { } 

  searchMovies() {
    console.log('Searching for:', this.query);

    if (this.query.trim()) {
      this.movieService.searchMovies(this.query).subscribe((response: any) => {
        console.log('Search results (full response):', response);
        this.movies = response || [];
        console.log('Movies:', this.movies);
      });
    }
  }

  addToFavorites(movie: any) {
    this.movieService.addToFavorites(movie);
  }

  viewDetails(id: string) {
    // Navigate to the movie detail page
    this.router.navigate(['/movie', id]);
  }

}
