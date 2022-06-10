import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../modals/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }
  getWeatherData(cityName: string): Observable<Weather> {
    return this.http.get<Weather>('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather', {
      headers: new HttpHeaders()
      .set('X-RapidAPI-Host', 'weather-by-api-ninjas.p.rapidapi.com')
      .set('X-RapidAPI-Key', '5bffbefba1mshae4ff40591f1f99p141716jsnc19b06fcab09'),
      params: new HttpParams()
      .set('city', cityName)
    })
  }
}
