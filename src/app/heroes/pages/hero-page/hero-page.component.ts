import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent {

  public hero?: Hero;
  
  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe({
        next: ( hero ) => this.hero = hero,
        error: () => this.router.navigate([ '/heroes/list' ])
      })
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list')
  }
}
