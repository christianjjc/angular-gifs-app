import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-card',
  standalone: false,
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.css',
})
export class GifCardComponent implements OnInit {
  // constructor(private giftsService: GifsService) {}

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required!.');
  }
}
