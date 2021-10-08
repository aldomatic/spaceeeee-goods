import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spaceee';
  photos: any = [];
  dateList: any = ['2016-07-13', '2017-02-27', '2018-05-01', '2018-06-02']
  apiKey = 'iagHhDKxsJJZ78haOJ7uaqvF2hiqY0azAEqSL0d2'
  constructor(private http: HttpClient) { }

  form = new FormGroup({
    dates: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  changeDate(event: any) {
    this.photos = [];
    this.http.get<any>(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${event.target.value}&api_key=${this.apiKey}`).subscribe(data => {
      this.photos = data.photos.slice(0,3);
      console.log(this.photos)
     })  
  }
}
