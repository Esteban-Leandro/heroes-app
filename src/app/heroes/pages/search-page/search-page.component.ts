import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero';
import { debounceTime } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public searchInput: FormControl = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(
    private heroesService: HeroesService
  ) { }

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService.gerSuggestions(value)
      .subscribe(heroes => this.heroes = heroes)
  }

  onSelectedOption({ option }: MatAutocompleteSelectedEvent): void {
    this.selectedHero = option.value as Hero;

    if (!this.selectedHero)
      return;
    
    this.searchInput.setValue( this.selectedHero.superhero )
  }
}
