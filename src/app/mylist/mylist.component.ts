import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, OnDestroy, Input } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html'
})

export class MyListComponent implements OnInit, OnChanges {
    @Input() name?: string;

    constructor() {
    
    }
    ngOnChanges(changes: SimpleChanges): void {
        //throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        //throw new Error('Method not implemented.');
    }

}