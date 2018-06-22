import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service'; 
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
              private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();//return an array of objects
  }

  getDish(id:number): Observable<Dish>{
   return this.restangular.one('dishes', id).get();//return one object
  }

  getFeaturedDish(): Observable<Dish> {
    return  this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);//return the first object in the array
  }

  getDishIds(): Observable<number[]>{
    return this.getDishes()
    .map(dishes => { return dishes.map(dish => dish.id) });
      
  }


}
