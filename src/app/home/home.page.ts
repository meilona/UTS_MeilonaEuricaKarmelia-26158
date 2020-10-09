import {Component, OnInit} from '@angular/core';
import {Item} from './item.model';
import {HomeService} from './home.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  items: Item[];

  constructor(
      private homeService: HomeService,
      private modalCtrl: ModalController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.items = this.homeService.getAllItems();
  }

}
