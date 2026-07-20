import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import {CommonModule}  from "@angular/common";
import { FormsModule } from '@angular/forms'; // 1. Import it
import {OnInit} from "@angular/core";
@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
 
   newAppointmentTitle: string = '';
   newAppointmentDescription: string = '';
   newAppointmentDate: Date = new Date();
   
   appointments: Appointment[] =[]

  ngOnInit(): void {
      const stored = localStorage.getItem('appointments');
      this.appointments = stored ? JSON.parse(stored) : [];
  }
   
   addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDescription.trim().length && this.newAppointmentDate) {
           let newAppointment: Appointment = {
            id: Date.now(), // Use current timestamp as a unique ID
            title: this.newAppointmentTitle,
            description: this.newAppointmentDescription,
            date: new Date(this.newAppointmentDate)
    } 
    this.appointments.push(newAppointment);
    this.newAppointmentTitle = '';
    this.newAppointmentDescription = '';
    this.newAppointmentDate = new Date();
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(app => app.id !== id);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}  
