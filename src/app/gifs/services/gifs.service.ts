import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagHistory: string[] = [];

  get tagHistory() {
    return [...this._tagHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizedHistory(tag);
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
  }
}
