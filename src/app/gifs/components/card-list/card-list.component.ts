import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifts-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
  standalone: false,
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];
}
