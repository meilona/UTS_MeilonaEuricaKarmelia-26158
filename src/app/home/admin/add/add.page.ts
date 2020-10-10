import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addForm: FormGroup;

  constructor(
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingController,
      private toastController: ToastController,
      private homeService: HomeService,
      private formBuilder: FormBuilder
  ) {
    // With FormBuilder
    this.addForm = this.formBuilder.group({
      imageUrl: new FormControl('', Validators.required),
      jenis: new FormControl('', Validators.required),
      merk: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      harga: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New item added.',
      color: 'success',
      duration: 2000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding item...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  onSubmit(values) {
    console.log('onSubmit');
    console.log(values);
    // const email = form.value.email;
    // const pNumber = form.value.phoneNumber;
    //
    // this.presentLoading().then(() => {
    //   const newItem: Item = {
    //     id: 'i',
    //     merk: values.name,
    //     imageUrl: values.imageUrl
    //   };
    //   this.homeService.addItem(newItem);
    //   this.modalCtrl.dismiss( 'success', 'confirm');
    //   this.presentToast();
    // });
  }

}
