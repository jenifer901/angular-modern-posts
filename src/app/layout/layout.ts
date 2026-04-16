import { Component } from '@angular/core';
import { AppHeaderComponent } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [AppHeaderComponent, RouterOutlet],
  templateUrl: './layout.html',
  standalone: true,
})
export class Layout {}
