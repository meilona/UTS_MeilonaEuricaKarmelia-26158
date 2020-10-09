import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../item.model';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() item: Item;

  constructor(
      private homeService: HomeService,

  ) { }

  ngOnInit() {}

  // ionViewWillEnter(){
  //   this.items = this.homeService.getAllItems();
  // }

}
