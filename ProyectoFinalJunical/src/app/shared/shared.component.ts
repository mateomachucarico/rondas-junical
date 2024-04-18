import {Component, OnInit} from '@angular/core';
import {SharedService} from "./shared.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  providers:[SharedService, HttpClient],
  selector: 'app-shared',
  standalone: true,
  imports: [],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }



}
