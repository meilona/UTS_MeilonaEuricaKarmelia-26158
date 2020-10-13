import { Injectable } from '@angular/core';
import {Item} from './item.model';
import {CPU} from './cpu.model';
import {RAM} from './ram.model';
import {Motherboard} from './motherboard.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private items: Item[] = [
    {
      id: 'i1',
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/6/352477833/352477833_057a8366-6573-41c6-a587-0c2522d54b94_700_700.jpg',
      merk: 'Asg',
      model: 'Asg',
      harga: '154000',
      stock: 45,
      jenis: 'RAM'
    },
    {
      id: 'i2',
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/7/27/16655158/16655158_15d93db0-40a4-4dd3-bd84-d2dd7c5e1ed5_762_759.png',
      merk: 'Vgen',
      model: 'Asg',
      harga: '79000',
      stock: 21,
      jenis: 'CPU'
    },
    {
      id: 'i3',
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/6/352477833/352477833_057a8366-6573-41c6-a587-0c2522d54b94_700_700.jpg',
      merk: 'Asg',
      model: 'Asg',
      harga: '154000',
      stock: 45,
      jenis: 'Motherboard'
    }
  ];

  private cpus: CPU[] = [
      {
        id: 'i2',
        baseClock: 'as',
        boostClock: 'as',
        coreCount: 12,
        threadCount: 21,
      }
  ];

  private rams: RAM[] = [
      {
        id: 'i1',
        speed: 'asd',
        size: 'adsa'
      }
  ];

  private motherboards: Motherboard[] = [
      {
        id: 'i3',
        chipset: 'sss',
        toMerk: 'xza'
      }
  ];

  private i: number;

  constructor() { }

  getAllItems(){
    return this.items;
  }

  getItem(itemId: string) {
    return {...this.items.find(item => {
        return item.id === itemId;
      })};
  }

  getCPU(itemId: string) {
    return {...this.cpus.find(cpu => {
        return cpu.id === itemId;
      })};
  }

  getRAM(itemId: string) {
    return {...this.rams.find(ram => {
        return ram.id === itemId;
      })};
  }

  getMotherboard(itemId: string) {
    return {...this.motherboards.find(motherboard => {
        return motherboard.id === itemId;
      })};
  }

  deleteItem(itemId: string) {
    this.items = this.items.filter(item => {
      if (item.jenis === 'CPU') {
        this.cpus = this.cpus.filter(cpu => {
          return cpu.id !== itemId;
        });
      } else if (item.jenis === 'RAM') {
        this.rams = this.rams.filter(ram => {
          return ram.id !== itemId;
        });
      } else if (item.jenis === 'Motherboard') {
        this.motherboards = this.motherboards.filter(motherboard => {
          return motherboard.id !== itemId;
        });
      }
      return item.id !== itemId;
    });
  }

  addItem(item: Item){
    const idSize: number = this.items.length + 1;
    const newItem: Item = {
      id: item.id + idSize,
      imageUrl: item.imageUrl,
      merk: item.merk,
      model: item.model,
      harga: item.harga,
      stock: item.stock,
      jenis: item.jenis
    };
    this.items.push(newItem);
    console.log(newItem);
  }

  addDetailCPU(cpu: CPU){
    const idSize: number = this.items.length;

    const newItemDetail: CPU = {
      id: cpu.id + idSize,
      baseClock: cpu.baseClock,
      boostClock: cpu.boostClock,
      coreCount: cpu.coreCount,
      threadCount: cpu.threadCount
    };
    this.cpus.push(newItemDetail);
    console.log(newItemDetail);
  }

  addDetailRAM(ram: RAM){
    const idSize: number = this.items.length;

    const newItemDetail: RAM = {
      id: ram.id + idSize,
      speed: ram.speed,
      size: ram.size
    };
    this.rams.push(newItemDetail);
    console.log(newItemDetail);
  }

  addDetailMotherboard(motherboards: Motherboard){
    const idSize: number = this.items.length;

    const newItemDetail: Motherboard = {
      id: motherboards.id + idSize,
      chipset: motherboards.chipset,
      toMerk: motherboards.toMerk
    };
    this.motherboards.push(newItemDetail);
    console.log(newItemDetail);
  }

  editItem(item: any, selectedIndex: any){
    this.items[selectedIndex] = item;
    console.log(item);
  }

  editDetailCPU(cpu: any){
    for (this.i = 0; this.i < this.cpus.length; this.i++) {
      if (this.cpus[this.i].id === cpu.id) {
        this.cpus[this.i] = cpu;
      }
    }
  }

  editDetailRAM(ram: any){
    for (this.i = 0; this.i < this.rams.length; this.i++) {
      if (this.rams[this.i].id === ram.id) {
        this.rams[this.i] = ram;
      }
    }
  }

  editDetailMotherboard(motherboard: any){
    for (this.i = 0; this.i < this.motherboards.length; this.i++) {
      if (this.motherboards[this.i].id === motherboard.id) {
        this.motherboards[this.i] = motherboard;
      }
    }
  }
}
