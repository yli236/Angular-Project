import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname':'',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationsMessages = {
    'firstname':{
      'required': 'First Name is required',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname':{
      'required': 'Last Name is required',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'telnum':{
      'required': 'Tel. Number is required',
      'pattern': 'Tel. Number must contain only numbers'
    },
    'email':{
      'required': 'Email is required',
      'email': 'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [null, [
        Validators.required,
        Validators.pattern
      ]],
      email: [null, [Validators.required, 
        Validators.email
      ]],
      agree:  [false, Validators.required],
      contacttype:['None', Validators.required],
      message: [null, Validators.required]
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

    onValueChanged(data?: any){
      if(!this.feedbackForm){
        return;
      }
      const form = this.feedbackForm;
      for(const field in this.formErrors){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationsMessages[field];
          for(const key in control.errors){
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  

  onsubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum:'',
      email:'',
      agree:false,
      contacttype:'None',
      message:''

    });
  }

}
