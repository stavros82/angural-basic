import { Component, signal } from '@angular/core';

import {AppointmentList} from './appointment-list/appointment-list';

@Component({
  selector: 'app-root',
  imports: [ AppointmentList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appointment-app');
}
