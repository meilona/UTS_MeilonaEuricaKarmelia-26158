import { Component, OnInit } from '@angular/core';
import {Item} from '../item.model';
import {AlertController, IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {HomeService} from '../home.service';
import {Router} from '@angular/router';
import {EditComponent} from './edit/edit.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  items: Item[];

  constructor(
      private homeService: HomeService,
      private modalCtrl: ModalController,
      private toastController: ToastController,
      private router: Router,
      private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.items = this.homeService.getAllItems();
  }

  async deleteAlert(itemId: any) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Item',
      message: 'Are you sure to delete this item?',
      backdropDismiss: false, // ini biar cuman bisa click di alert doang, diluarnya gabisa
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler:  () => this.deleteContact(itemId)
        }
      ]
    });
    await  alert.present();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'Item deleted',
      duration: 2000,
      color: 'warning'
    });

    await toast.present();
  }

  deleteContact(itemId: any) {
    this.homeService.deleteItem(itemId);
    // untuk navigate setelah menghapus kembali ke page sebelumnya
    this.ionViewWillEnter();
    this.deleteToast();
  }

  // slide
  delete(item: Item, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(item.merk, 'is deleted');
    this.deleteAlert(item.id);
  }

  edit(i: any, item: Item, slidingItem: IonItemSliding) {
    slidingItem.close();
    const index = i;
    const itemId = item.id;
    console.log(itemId, 'click');
    this.editModal(itemId, index);
  }

  async editModal(itemId: string, index: any) {
    const modal = await this.modalCtrl.create({
      component: EditComponent,
      componentProps: { selectedItem: itemId, selectedIndex: index }
    });

    modal.onDidDismiss().then(resultData => {
      console.log(resultData.data, resultData.role);
      this.ionViewWillEnter();
    });

    return await modal.present();
  }

}
