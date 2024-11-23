import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  standalone: false,
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private giftsService: GifsService) {}

  get tags(): string[] {
    return this.giftsService.tagHistory;
  }

  searchTag(tag: string) {
    this.giftsService.searchTag(tag);
  }
}
