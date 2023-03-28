import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit, OnDestroy {

  public heroes!: Hero[];
  public subscripitons: Subscription[] = [];
  constructor(
    private heroesService: HeroesService
  ){}

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.subscripitons.forEach( sub => sub.unsubscribe() )
  }

  getHeroes(){
    const sub = this.heroesService.getHeroes()
      .subscribe(( heroes: Hero[] ) => this.heroes = heroes )

    this.subscripitons.push( sub )
  }
}
