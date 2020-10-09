import { Component, OnInit } from '@angular/core';
import {Item} from '../item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../home.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedItem: Item;

  constructor(
      private activatedRoute: ActivatedRoute,
      private homeService: HomeService,
      private toastController: ToastController,
      private router: Router,
      private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // ......
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemId')) { return; }
      const itemId = paramMap.get('itemId');
      this.loadedItem = this.homeService.getItem(itemId);
    });
  }

}
