import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponseI } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private serviceUrlString = `https://api.giphy.com/v1/gifs/`;
  private apikey: string = 'ek60FnwMSTXk9BDE39IRhn6x3x5WYOBv';

  constructor(private http: HttpClient) {
    this.readFromLocalStorage();
  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponseI>(`${this.serviceUrlString}search?`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('_tagHistory', JSON.stringify(this._tagHistory));
  }

  private readFromLocalStorage() {
    if (!localStorage.getItem('_tagHistory')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('_tagHistory')!);
    if (this.tagHistory.length < 1) return;
    this.searchTag(this.tagHistory[0]);
  }
}

// `https://api.giphy.com/v1/gifs/search?api_key=${this.apikey}&q=goku&limit=10`
