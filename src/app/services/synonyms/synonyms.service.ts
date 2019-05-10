import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISynonym } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SynonymsService {
  constructor(private http: HttpClient) { }

  getSynonyms(word: string): Observable<ISynonym[]> {
    const params = {
      ml: word
    };

    return <Observable<ISynonym[] >> this.http.get('https://api.datamuse.com/words', { params });
  }
}
