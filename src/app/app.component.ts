/// <reference types="@types/googlemaps" />

import { Component } from '@angular/core';
import { GetDataService } from './getdata.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

  title = 'AIR POLLUTION REPORT (WorldWide)';

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  errorMessage: string;

  //to get filtered city
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.countryData = this.listFilter ? this.performFilter(this.listFilter) : this.aqData;
    }

    p: number = 1;
    aqData : any;
    countryData : any;

    constructor(private orderService: GetDataService) {}

    //method for searching specific city
    performFilter(filterBy: string): any {
        filterBy = filterBy.toLocaleLowerCase();
        console.log('Inside perform filter:'+filterBy)
        return this.aqData.filter((aq: any) =>
              aq.country.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    //method for highlighting specific location 
    setcenter(lat:number,long:number, city:string, value:number){

      this.map.setCenter(new google.maps.LatLng(lat,long));

      var infowindow = new google.maps.InfoWindow({
        content: city+" Air Quality - PM value : "+value
      });

      var pos = { lat: lat , lng : long};

      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Check air quality'
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    }
   
    ngOnInit(): void {

      var mapProp = {
        center: new google.maps.LatLng(28.63576, 77.22445),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //setting inital map view
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      //Service call to get data
      this.orderService.getinfo()
                .subscribe(data => {
                  this.aqData = data.results;
                  this.countryData = this.aqData;
                  console.log("Data:",this.aqData);
                }                    
                ,
                    error => this.errorMessage = <any>error);                  
    }
   
    
  }
