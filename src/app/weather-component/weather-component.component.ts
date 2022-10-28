import { getLocaleDirection } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css']
})
export class WeatherComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getLocation;
  }
  
  isButtonClicked = false;
  currentTemp = "";
  currentConditions = "";
  currentLocation = "";

  getLocation(): void {
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition((position) => {
        const value = this.showPosition(position);
        this.isButtonClicked = true;
      });
    } else {
      alert("Geolocation is not supported in your browser");
    }
    // this.isButtonClicked = true;
  }

   async showPosition(position: any){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat);
    const api = "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat;
    const response = await fetch(api);
    const data = await response.text();
    console.log('data', data);
    this.currentTemp = JSON.parse(data).main.temp + "°C";
    this.currentConditions = JSON.parse(data).weather[0].description;
    this.currentLocation = JSON.parse(data).name;
    return data;
  }

}