import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Weather } from 'src/app/modals/Weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService,
    private fb:FormBuilder
    ) {}

  cityName: string = 'Welcome';
  weatherData?: Weather;
  temperature:number = 20;
  searchForm:any;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
    city:['']
    })
  }

  onSubmit() {
   this.cityName = this.searchForm?.controls.city.value.length < 3 ? 'Enter min 3 characters':this.searchForm?.controls.city.value ;
  this.getWeatherData(this.searchForm?.controls.city.value);
  }

  private getWeatherData(cityName: string) {
  this.weatherService.getWeatherData(cityName)
  .subscribe(
    result => {
      // Handle result
     this.weatherData = result,
     this.temperature = result?.temp
    },
    error => {
      this.cityName = error.status === 400 ? 'Please check city name' : 'We are facing issues'
    },
  );
  }

}