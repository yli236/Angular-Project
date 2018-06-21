import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service'; 
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {

  constructor(private http: Http,
              private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
    .map(res => { return this.processHttpmsgService.extractData(res); })
    .catch(error => { return this.processHttpmsgService.handleError(error); });
      
  }

  getDish(id:number): Observable<Dish>{
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => { return this.processHttpmsgService.extractData(res)})
      .catch(error => {return this.processHttpmsgService.handleError(error)});
  }

  getFeaturedDish(): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes?featured=true')
      .map(res => {return this.processHttpmsgService.extractData(res)[0]})
      .catch(error => {return this.processHttpmsgService.handleError(error)});
      ;//returning an array
  }

  getDishIds(): Observable<number[]>{
    return this.getDishes()
    .map(dishes => { return dishes.map(dish => dish.id) });
      
  }


}
