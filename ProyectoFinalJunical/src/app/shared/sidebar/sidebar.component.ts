import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../shared.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
  providers: [SharedService, HttpClient],
  selector: 'app-sidebar',
  standalone: true,
  imports: [

    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }
  onNuevaRonda() {
    this.router.navigate(['/crear-ronda']);
  }
  //(click)="onNuevaRonda()


}
