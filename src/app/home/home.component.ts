import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    AvatarModule,
    AvatarGroupModule,
    ChipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Sample data for testimonials
  testimonials = [
    { name: 'Alex Johnson', role: 'Developer', comment: 'This framework has simplified our state management immensely!' },
    { name: 'Sarah Chen', role: 'Tech Lead', comment: 'The signal store approach is exactly what we needed for our reactive applications.' },
    { name: 'Miguel Rodriguez', role: 'Senior Engineer', comment: 'Clean, predictable state management that works as expected.' }
  ];
  
  // Feature highlights
  features = [
    { title: 'Simplified State', description: 'Manage application state with minimal boilerplate code', icon: 'pi pi-bolt' },
    { title: 'Reactive Architecture', description: 'Built on Angular signals for reactive, fine-grained updates', icon: 'pi pi-sync' },
    { title: 'Developer Experience', description: 'Intuitive API designed with developer experience in mind', icon: 'pi pi-heart' }
  ];
}