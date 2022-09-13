import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-seg',
  templateUrl: './search-segment.components.html',
  styleUrls: ['./search-segment.components.css']
})

export class SearchSegment implements OnInit{
  // searchForm!: FormGroup;
  constructor(
    // private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    // this.searchForm = this.formBuilder.group({ tickerInput: '' });
    // // console.log("search-form");
    // this.searchForm.get('tickerInput')
  }
}
