import { Component, OnInit } from '@angular/core';
import { routes } from '../../interfaces/routes.model';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent  {
public get getRoutes(): typeof routes {
  return routes
}
}
