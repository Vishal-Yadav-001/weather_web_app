import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Weather } from 'src/app/modals/Weather';
import { WeatherService } from 'src/app/services/weather.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private msgService: MessageService
  ) {}

  cityName: string = 'Welcome';
  weatherData?: Weather;
  temperature: number = 20;
  searchForm: any;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: [''],
    });
  }

  onSubmit() {
    if (this.searchForm?.controls.city.value.length < 3) {
      this.msgService.add({key: 'error', severity:'info', summary: 'Enter min 3 chars', detail:''});
      this.temperature = 0;
    } else {
      this.cityName = this.searchForm?.controls.city.value;
    }
    if (this.searchForm?.controls.city.value.length > 3) {
      this.getWeatherData(this.searchForm?.controls.city.value);
    }
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe(
      (result) => {
        // Handle result
        (this.weatherData = result), (this.temperature = result?.temp);
      },
      (error) => {
        let erroMessage =
          error.status === 400
            ? 'Please check city name'
            : 'We are facing issues';
        this.temperature = 0;
        this.msgService.add({key: 'error', severity:'warn', summary: erroMessage, detail:''});
      }
    );
  }
}
