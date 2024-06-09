import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroDetails, HeroStats } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = 'http://192.168.1.71:8782';

  http: HttpClient = inject(HttpClient)

  constructor() { }

  getHeroes(): Observable<HeroDetails[]> {
    var queryApiHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,DELETE',
    };

    const options = {
      headers: queryApiHeaders,
      rejectUnauthorized: false,
    };

    return this.http.get<HeroDetails[]>(`${this.apiUrl}/get-all-heroes`, options);
  }

  getHeroDetails(id: number): Observable<HeroDetails> {
    var queryApiHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,DELETE',
    };

    const options = {
      headers: queryApiHeaders,
      rejectUnauthorized: false,
    };

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<HeroDetails>(url, options);
  }

  getHeroStats(hero: string): Observable<HeroStats> {
    var queryApiHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,DELETE',
    };

    const options = {
      headers: queryApiHeaders,
      rejectUnauthorized: false,
    };

    const url = `${this.apiUrl}/get-hero-stats-by-name/${hero}`;
    return this.http.get<HeroStats>(url, options);
  }
}
