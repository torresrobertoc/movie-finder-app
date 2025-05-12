import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [NgFor, NgIf],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovieDetails(id);
    }
  }

  loadMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe((response: any) => {
      console.log('Movie details:', response);
      this.movie = response;
    });
  }

  addToFavorites() {
    if (!this.movie) {
      return;
    }
    this.movieService.addToFavorites(this.movie);
  }

  navigateBack(): void {
    console.log('Navigating back to search...');
    this.router.navigate(['/']);
  }

}