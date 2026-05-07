import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz';

@Component({
  selector: 'app-root',
  imports: [QuizComponent],
  template: '<app-quiz></app-quiz>',
})
export class App {}
