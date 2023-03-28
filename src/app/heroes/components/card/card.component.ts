import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public hero!: Hero

  ngOnInit(): void {
    if(!this.hero) throw new Error("Hero property is required");
    
  }
}
