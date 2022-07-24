import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {
  weather_data: any;
  current_data: any;
  isLoading: any;
  searchForm: FormGroup;
  constructor(private dataService: ApiDataService) { 
    this.weather_data = [];
    this.current_data = {};
    this.isLoading = false;
    this.searchForm = new FormGroup({
      location: new FormControl('')
    })
  }

  getWeatherData(location:string){
    console.log("calling get weather")
    location = location.trim()
    if(location==""){
      alert("Please enter the location!!");
      return;
    }
    this.isLoading= true;
    this.weather_data = [];
      this.dataService.getData(`/getCurrentWeather/${location}`).subscribe(data =>{
        console.log(data);
        this.weather_data = data;
        this.isLoading= false;

        this.current_data = this.weather_data.weather_details[0];
        this.weather_data.weather_details.shift();
      },(err) => {
        console.log(err);
        if (err.status == 500){
          alert("Please check the location you've entered!!!");
        }
        else{
          alert("Some Error Occurred, please try again later!");
        }
      }
      )
  }

  onSubmit(){
    console.log(this.searchForm.value.location);
    this.getWeatherData(this.searchForm.value.location);
  }

  ngOnInit(): void {
    this.getWeatherData("hyderabad")
  }

}
