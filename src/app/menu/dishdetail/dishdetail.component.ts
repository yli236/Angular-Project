import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { Comment } from '../../shared/Comment';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']

  
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  formErrors = {
    'author':'',
    'rating':'',
    'comment':''
  };

  validationsMessages = {
    'author': {
      'required': 'Name is required',
      'minlength':'Name must be at least 2 characters long',
      'maxlength':'Name cannot be more than 25 characters long'
    },
    'comment':{
      'required':'Comment is required',
      'minlength':'Comment must be at least 2 characters long',
      'maxlength':'Comment cannot be more than 25 characters long'
    }
  };


  
  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {
               
               }

  ngOnInit() {

    this.createForm();

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }
      ,errmess =>this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }



  createForm(){
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],      
      rating: '',
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]

    })
    console.log(this.commentForm);
    this.commentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationsMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key]+' ';
        }
      }
    }
  }

  onsubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author:'',
      rating: '',
      comment: ''
    });
  

  }




}
