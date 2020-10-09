import { Component, OnInit } from '@angular/core';
import {Item} from '../item.model';
import {IonItemSliding, ModalController} from '@ionic/angular';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  items: Item[];

  constructor(
      private homeService: HomeService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.items = this.homeService.getAllItems();
  }

  // slide
  delete(item: Item, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(item.merk, 'is deleted');
  }

  edit(i: any, item: Item, slidingItem: IonItemSliding) {
    slidingItem.close();
    const index = i;
    // const itemId = item.id;
    console.log(item.id, 'edited');
    // this.editModal(contactId, index);
  }

}
