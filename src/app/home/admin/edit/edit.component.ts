import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../item.model';
import {Router} from '@angular/router';
import {HomeService} from '../../home.service';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Motherboard} from '../../motherboard.model';
import {RAM} from '../../ram.model';
import {CPU} from '../../cpu.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() selectedItem: string;
  @Input() selectedIndex: any;

  editForm: FormGroup;
  itemId: any;
  itemData: Item;
  cpuData: CPU;
  ramData: RAM;
  motherboardData: Motherboard;
  private i: number;

  // Getter method to access formcontrols
  get merk() {
    return this.editForm.get('merk');
  }

  get imageUrl() {
    return this.editForm.get('imageUrl');
  }

  get model() {
    return this.editForm.get('model');
  }

  get harga() {
    return this.editForm.get('harga');
  }

  get stock() {
    return this.editForm.get('stock');
  }

  get base() {
    return this.editForm.get('baseClock');
  }

  get boost() {
    return this.editForm.get('boostClock');
  }

  get core() {
    return this.editForm.get('coreCount');
  }

  get thread() {
    return this.editForm.get('threadCount');
  }

  get speed() {
    return this.editForm.get('speed');
  }

  get size() {
    return this.editForm.get('size');
  }

  get chipset() {
    return this.editForm.get('chipset');
  }

  get toMerk() {
    return this.editForm.get('toMerk');
  }

  get jenis() {
    return this.editForm.get('jenis');
  }

  constructor(
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingController,
      private toastController: ToastController,
      private homeService: HomeService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
    // With FormBuilder
    this.editForm = this.formBuilder.group({
      merk: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      harga: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      jenis: new FormControl('', Validators.required),
      baseClock: new FormControl(''),
      boostClock: new FormControl(''),
      coreCount: new FormControl(''),
      threadCount: new FormControl(''),
      speed: new FormControl(''),
      size: new FormControl(''),
      chipset: new FormControl(''),
      toMerk: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadItemDetails(this.selectedItem);
    let baseClock = null;
    baseClock = this.base;
    let boostClock = null;
    boostClock = this.boost;
    let coreCount = null;
    coreCount = this.core;
    let threadCount = null;
    threadCount = this.thread;
    let speed = null;
    speed = this.speed;
    let size = null;
    size = this.size;
    let chipset = null;
    chipset = this.chipset;
    let toMerk = null;
    toMerk = this.toMerk;
    if (this.itemData.jenis === 'CPU') {
      baseClock.setValidators(Validators.required);
      baseClock.updateValueAndValidity();
      boostClock.setValidators(Validators.required);
      boostClock.updateValueAndValidity();
      coreCount.setValidators(Validators.required);
      coreCount.updateValueAndValidity();
      threadCount.setValidators(Validators.required);
      threadCount.updateValueAndValidity();
    } else if (this.itemData.jenis === 'RAM') {
        speed.setValidators(Validators.required);
        speed.updateValueAndValidity();
        size.setValidators(Validators.required);
        size.updateValueAndValidity();
    } else if (this.itemData.jenis === 'Motherboard') {
        chipset.setValidators(Validators.required);
        chipset.updateValueAndValidity();
        toMerk.setValidators(Validators.required);
        toMerk.updateValueAndValidity();
    }
  }

  loadItemDetails(itemId){
    this.itemData = this.homeService.getItem(itemId);
    this.editForm.controls.merk.setValue(this.itemData.merk);
    this.editForm.controls.model.setValue(this.itemData.model);
    this.editForm.controls.imageUrl.setValue(this.itemData.imageUrl);
    this.editForm.controls.harga.setValue(this.itemData.harga);
    this.editForm.controls.stock.setValue(this.itemData.stock);
    this.editForm.controls.jenis.setValue(this.itemData.jenis);

    if (this.itemData.jenis === 'CPU') {
      this.cpuData = this.homeService.getCPU(itemId);
      this.editForm.controls.baseClock.setValue(this.cpuData.baseClock);
      this.editForm.controls.boostClock.setValue(this.cpuData.boostClock);
      this.editForm.controls.coreCount.setValue(this.cpuData.coreCount);
      this.editForm.controls.threadCount.setValue(this.cpuData.threadCount);
    } else if (this.itemData.jenis === 'RAM') {
      this.ramData = this.homeService.getRAM(itemId);
      this.editForm.controls.speed.setValue(this.ramData.speed);
      this.editForm.controls.size.setValue(this.ramData.size);
    } else if (this.itemData.jenis === 'Motherboard') {
      this.motherboardData = this.homeService.getMotherboard(itemId);
      this.editForm.controls.chipset.setValue(this.motherboardData.chipset);
      this.editForm.controls.toMerk.setValue(this.motherboardData.toMerk);
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving item...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item Editted.',
      color: 'success',
      duration: 2000
    });
    await toast.present();
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(values) {
    this.presentLoading().then(() => {
      console.log(this.selectedItem);
      console.log(this.selectedIndex);
      const merk = values.merk;
      const model = values.model;
      const imageUrl = values.imageUrl;
      const harga = values.harga;
      const stock = values.stock;
      let splittedImage;

      if (typeof imageUrl === 'string'){
        splittedImage = imageUrl.split(',');
        splittedImage = this.filteredData(splittedImage);
        this.sendEdittedData(merk, model, splittedImage, harga, stock);
      } else {
        this.sendEdittedData(merk, model, imageUrl, harga, stock);
      }

      if (this.itemData.jenis === 'CPU') {
        const edittedDetail: CPU = {
          id: this.selectedItem,
          baseClock : values.baseClock,
          boostClock : values.boostClock,
          coreCount : values.coreCount,
          threadCount : values.threadCount
        };
        console.log(edittedDetail);
        this.homeService.editDetailCPU(edittedDetail);
      } else if (this.itemData.jenis === 'RAM') {
        const edittedDetail: RAM = {
          id: this.selectedItem,
          speed : values.speed,
          size : values.size
        };
        console.log(edittedDetail);
        this.homeService.editDetailRAM(edittedDetail);
      } else if (this.itemData.jenis === 'Motherboard') {
        const edittedDetail: Motherboard = {
          id: this.selectedItem,
          chipset : values.chipset,
          toMerk : values.toMerk
        };
        console.log(edittedDetail);
        this.homeService.editDetailMotherboard(edittedDetail);
      }

      this.modalCtrl.dismiss( 'success', 'confirm');
      this.presentToast();
    });
  }

  filteredData(splittedImage){
    const tempArr = [];
    for (this.i = 0; this.i < splittedImage.length; this.i++) {
      const now = splittedImage[this.i].trim();
      if (now !== undefined && now !== '') {
        tempArr.push(splittedImage[this.i]);
      }
    }
    return tempArr;
  }

  sendEdittedData(merk: string, model: string, imageUrl: any, harga: any, stock: any){
    const edittedItem: Item = {
      id: this.selectedItem,
      merk,
      model,
      imageUrl,
      harga,
      stock,
      jenis: this.itemData.jenis
    };
    console.log(edittedItem);
    this.homeService.editItem(edittedItem, this.selectedIndex);
  }

}
