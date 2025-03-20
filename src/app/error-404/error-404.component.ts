import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-error-404',
  standalone: true,
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss',
  imports: [
    RouterLink,
    ButtonModule,
    CardModule,
    DividerModule,
    CommonModule,
    ImageModule,
    RippleModule
  ],
})
export class Error404Component {}