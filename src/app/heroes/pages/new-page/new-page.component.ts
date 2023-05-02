import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Subscription, filter, switchMap } from 'rxjs';

import { Publisher, Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit, OnDestroy {

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alt_img: new FormControl<string>(''),
  })
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  public subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    const sub = this.route.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe({
        next: (hero: Hero) => {
          this.heroForm.reset(hero)
        },
        error: () => {
          this.router.navigateByUrl('/')
        }
      })

    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get currentHero(): Hero {
    return this.heroForm.getRawValue() as Hero;
  }

  onSubmit() {
    if (this.currentHero.id) {
      this.updateHero();
      return;
    }
    this.addHero();

  }


  addHero(): void {
    const sub = this.heroesService.addHero(this.currentHero).subscribe((hero: Hero) => {
      this.showSnackbar(`${hero.superhero} created!`)
      this.router.navigate(['/heroes/edit', hero.id])

    })
  }

  updateHero(): void {
    const sub = this.heroesService.updateHero(this.currentHero).subscribe((hero: Hero) => {
      this.showSnackbar(`${hero.superhero} updated!`)
    })
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error("hero id is required");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.heroesService.deleteHero( this.currentHero.id )),
        filter(( wasDeleted: boolean )=> wasDeleted )
      ).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          this.showSnackbar(`${ this.currentHero.superhero } deleted!`)

        }
      });

  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }
}
