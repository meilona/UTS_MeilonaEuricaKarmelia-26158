import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {HomeService} from '../../home.service';
import {core} from '@angular/compiler';
import {Item} from '../../item.model';
import {Router} from '@angular/router';
import {CPU} from '../../cpu.model';
import {RAM} from '../../ram.model';
import {Motherboard} from '../../motherboard.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addForm: FormGroup;
  selectedJenis = '';
  private i: number;

  public jenisOptions = [
    { value: 'RAM', displayValue: 'RAM' },
    { value: 'GPU', displayValue: 'GPU' },
    { value: 'CPU', displayValue: 'CPU' },
    { value: 'Motherboard', displayValue: 'Motherboard' }
  ];

  // Getter method to access formcontrols
  get jenisBarang() {
    return this.addForm.get('jenis');
  }

  get getBase() {
    return this.addForm.get('baseClock');
  }

  get getBoost() {
    return this.addForm.get('boostClock');
  }

  get getCore() {
    return this.addForm.get('coreCount');
  }

  get getThread() {
    return this.addForm.get('threadCount');
  }

  get getSpeed() {
    return this.addForm.get('speed');
  }

  get getSize() {
    return this.addForm.get('size');
  }

  get getChipset() {
    return this.addForm.get('chipset');
  }

  get getToMerk() {
    return this.addForm.get('toMerk');
  }

  constructor(
      private router: Router,
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
      stock: new FormControl('', [Validators.required]),
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

  ngOnInit() {}

  onSelectedJenis(event) {
    this.selectedJenis = event.detail.value;
    console.log(this.selectedJenis);
    let baseClock = null;
    baseClock = this.getBase;
    let boostClock = null;
    boostClock = this.getBoost;
    let coreCount = null;
    coreCount = this.getCore;
    let threadCount = null;
    threadCount = this.getThread;
    let speed = null;
    speed = this.getSpeed;
    let size = null;
    size = this.getSize;
    let chipset = null;
    chipset = this.getChipset;
    let toMerk = null;
    toMerk = this.getToMerk;
    if (this.selectedJenis === 'CPU') {
      baseClock.setValidators(Validators.required);
      baseClock.updateValueAndValidity();
      boostClock.setValidators(Validators.required);
      boostClock.updateValueAndValidity();
      coreCount.setValidators(Validators.required);
      coreCount.updateValueAndValidity();
      threadCount.setValidators(Validators.required);
      threadCount.updateValueAndValidity();
    } else {
      this.resetCPU(baseClock, boostClock, coreCount, threadCount);
      if (this.selectedJenis === 'RAM') {
        speed.setValidators(Validators.required);
        speed.updateValueAndValidity();
        size.setValidators(Validators.required);
        size.updateValueAndValidity();
      } else {
        this.resetForm(speed, size);
        if (this.selectedJenis === 'Motherboard') {
          chipset.setValidators(Validators.required);
          chipset.updateValueAndValidity();
          toMerk.setValidators(Validators.required);
          toMerk.updateValueAndValidity();
        } else {
          this.resetForm(chipset, toMerk);
        }
      }
    }
  }

  // reset cpu
  resetCPU(baseClock, boostClock, coreCount, threadCount){
    if (baseClock.value !== null){
      baseClock.setValue(null);
    }
    if (boostClock.value !== null){
      boostClock.setValue(null);
    }
    if (coreCount.value !== null){
      coreCount.setValue(null);
    }
    if (threadCount.value !== null){
      threadCount.setValue(null);
    }
    baseClock.clearValidators();
    baseClock.updateValueAndValidity();
    boostClock.clearValidators();
    boostClock.updateValueAndValidity();
    coreCount.clearValidators();
    coreCount.updateValueAndValidity();
    threadCount.clearValidators();
    threadCount.updateValueAndValidity();
  }

  // bisa reset ram bisa Motherboard
  resetForm(a, b){
    if (a.value != null){
      a.setValue(null);
    }
    if (b.value != null){
      b.setValue(null);
    }
    a.clearValidators();
    a.updateValueAndValidity();
    b.clearValidators();
    b.updateValueAndValidity();
  }

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
      duration: 3000
    });

    loading.onDidDismiss().then((dis) => {
      this.presentToast();
      this.router.navigate(['/home/admin']);
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  onSubmit(values) {
    console.log('onSubmit');
    const imageUrl = values.imageUrl;
    const jenis = values.jenis;
    const merk = values.merk;
    const model = values.model;
    const harga = values.harga;
    const stock = values.stock;

    let splittedImage;

    if (typeof imageUrl === 'string'){
      splittedImage = imageUrl.split(',');
      splittedImage = this.filteredData(splittedImage);
    }

    // build new item data
    const newItem: Item = {
      id: 'i',
      imageUrl: splittedImage,
      jenis,
      merk,
      model,
      harga,
      stock
    };

    this.presentLoading().then(() => {
      this.homeService.addItem(newItem);
      // check then build detail item
      if (jenis === 'CPU'){
        const newItemDetail: CPU = {
          id: 'i',
          baseClock: values.baseClock,
          boostClock: values.boostClock,
          coreCount: values.coreCount,
          threadCount: values.threadCount
        };
        this.homeService.addDetailCPU(newItemDetail);
      } else if (jenis === 'RAM') {
        const speed = values.speed;
        const size = values.size;
        const newItemDetail: RAM = {
          id: 'i',
          speed: values.speed,
          size: values.size
        };
        this.homeService.addDetailRAM(newItemDetail);
      } else if (jenis === 'Motherboard') {
        const newItemDetail: Motherboard = {
          id: 'i',
          chipset: values.chipset,
          toMerk: values.toMerk
        };
        this.homeService.addDetailMotherboard(newItemDetail);
      }
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

}
