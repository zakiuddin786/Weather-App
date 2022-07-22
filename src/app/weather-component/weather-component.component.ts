import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {
  weather_data: any;
  constructor(private dataService: ApiDataService) { }

  getWeatherData( ){
    console.log("calling get weather")

      this.dataService.getData("/getCurrentWeather").subscribe(data =>{
        console.log(data);
        this.weather_data = data;
      })
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  ngOnInit(): void {
    this.getWeatherData()
  }

}
