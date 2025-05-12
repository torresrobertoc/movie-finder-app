import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites: any[] = [];

  constructor(private movieService: MovieService) {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.movieService.getFavorites();
  }

  removeFromFavorites(movie: any) {
    this.movieService.removeFromFavorites(movie);
    this.loadFavorites();
  }

  clearFavorites() {
    this.movieService.clearFavorites();
    this.favorites = [];
  }
}
