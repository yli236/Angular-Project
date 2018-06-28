import { Injectable } from '@angular/core';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';


@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  public submitFeedback(feedback: Feedback){
    return this.restangular.all('feedback').post(feedback);
    
  }

}
