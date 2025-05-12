import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app-root/app-root.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MovieSearchComponent } from './app/movie-search/movie-search.component';
import { FavoritesComponent } from './app/favorites/favorites.component';
import { MovieDetailComponent } from './app/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: MovieSearchComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: MovieSearchComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'movie/:id', component: MovieDetailComponent }
    ], withComponentInputBinding()),
    provideHttpClient()
  ]
})
.catch((err) => console.error(err));