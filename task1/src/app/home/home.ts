import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  title = 'Welcome to Home Page';
  logo = 'https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2560%2Cc_limit/DSC_5903.jpg';
}