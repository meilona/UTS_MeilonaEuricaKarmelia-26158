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
      imageUrl: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/15/37742550/37742550_354664e5-8e07-4de2-b6d7-60a17bf32365_700_700.png',
      'https://images-na.ssl-images-amazon.com/images/I/610uhUYbLVL._AC_SY355_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTxZEigpkuGw8bJsYWSM_Z72sL_YaF8xLB3Q&usqp=CAU'],
      merk: 'GIGABYTE NVIDIA GeForce',
      model: 'GTX 1080 G1 Gaming GV-N1080G1 GAMING-8GD',
      harga: '8800000',
      stock: 12,
      jenis: 'GPU'
    },
    {
      id: 'i2',
      imageUrl: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/9/9651507/9651507_d703c0ce-0692-4d54-8197-38e40a60ddef_1024_1024',
        'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/9/9651507/9651507_306ce7f5-4d5d-479c-8841-4f350dd6a0c8_1024_1024'],
      merk: 'MSI',
      model: 'B450-A Pro MAX',
      harga: '1640000',
      stock: 6,
      jenis: 'Motherboard'
    },
    {
      id: 'i3',
      imageUrl: [ 'https://images-na.ssl-images-amazon.com/images/I/512Q-UYjrSL._AC_.jpg',
        'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/3/22/2463462/2463462_1bc7272d-5df3-414b-ba31-de8cf2542fd3.jpg'],
      merk: 'Intel Core i5',
      model: 'i5-660',
      harga: '8800000',
      stock: 12,
      jenis: 'CPU'
    },
    {
      id: 'i4',
      imageUrl: ['https://sc01.alicdn.com/kf/HTB1drcBKpXXXXc4XVXXq6xXFXXXn.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/71rzp7ei5iL._AC_SL1249_.jpg'],
      merk: 'AMD',
      model: 'Phenom II X6 1100T',
      harga: '38000000',
      stock: 5,
      jenis: 'CPU'
    },
    {
      id: 'i5',
      imageUrl: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/3/2123831/2123831_5fdffc36-de32-4a8e-8131-71d70df01768_700_700.jpg',
      'https://i1.wp.com/www.overclockingid.com/wp-content/uploads/2019/08/HyperX-FURY-DDR4-RGB-PR-use.jpg?resize=660%2C413'],
      merk: 'Kingston',
      model: 'HyperX Furry DDR4 RGB',
      harga: '1234000',
      stock: 32,
      jenis: 'RAM'
    },
    {
      id: 'i6',
      imageUrl: ['https://www.gudanggaming.com/storage/news/c5ff15a740c2cb0d937e619e619c4d9d.jpg',
      'https://s4.bukalapak.com/img/4096214758/large/Corsair_DDR4_Dominator_Platinum_RGB_PC25600_16GB_2X8GB_CMT16.png'],
      merk: 'Corsair',
      model: 'DDR4 Dominator Platinum RGB PC25600 32GB - CMT32GX4M2C3200C16',
      harga: '1520000',
      stock: 44,
      jenis: 'RAM'
    },
    {
      id: 'i7',
      imageUrl: ['https://www.asrock.com/mb/photo/B550%20Phantom%20Gaming-ITXax(L1).png',
      'https://www.asrock.com/mb/photo/B550%20Phantom%20Gaming-ITXax(L3).png',
      'https://www.asrock.com/mb/photo/B550%20Phantom%20Gaming-ITXax(L2).png',
      'https://www.asrock.com/mb/photo/B550%20Phantom%20Gaming-ITXax(L5).png'],
      merk: 'Asrock',
      model: 'B550 Phantom Gaming ITX',
      harga: '3451000',
      stock: 4,
      jenis: 'Motherboard'
    },
    {
      id: 'i8',
      imageUrl: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/3/batch-upload/batch-upload_2d9ab331-0876-4391-a8ac-27ee7625af78.jpg',
      'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/3/batch-upload/batch-upload_c5a50f8f-4d58-4645-b173-c68bcbbb33c5.jpg',
      'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/3/batch-upload/batch-upload_e679923e-d528-4fb6-8e47-f6f451c35084.jpg'],
      merk: 'Asus',
      model: 'ROG Maximus XI Hero M11H',
      harga: '19051000',
      stock: 2,
      jenis: 'Motherboard'
    },
    {
      id: 'i9',
      imageUrl: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/22/39745182/39745182_a83c92b8-a610-44d9-975b-843db2a4b936_700_700',
        'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/22/39745182/39745182_ae173a81-5d99-4137-8249-b1cae8b47f33_700_700'],
      merk: 'Colorful GeForce GTX1050Ti NB 4G',
      model: 'GTX 1050Ti',
      harga: '1920000',
      stock: 0,
      jenis: 'GPU'
    }
  ];

  private cpus: CPU[] = [
      {
        id: 'i3',
        baseClock: '3333MHz',
        boostClock: '3600MHz',
        coreCount: 2,
        threadCount: 4,
      },
      {
        id: 'i4',
        baseClock: '3300MHz',
        boostClock: '3700MHz',
        coreCount: 6,
        threadCount: 6,
      }
  ];

  private rams: RAM[] = [
      {
        id: 'i5',
        speed: '3200Mhz',
        size: '16GB (8GB x 2)'
      },
      {
        id: 'i6',
        speed: 'DDR4 PC25600 (3200Mhz)',
        size: '32GB (2X16GB)'
      }
  ];

  private motherboards: Motherboard[] = [
      {
        id: 'i2',
        chipset: 'B450',
        toMerk: 'Supports 2-Way AMD CrossFire Technology'
      },
      {
        id: 'i7',
        chipset: 'AMD B550',
        toMerk: 'Supports 3rd Gen AMD AM4 Ryzen™ / future AMD Ryzen™ Processors*'
      },
      {
        id: 'i8',
        chipset: 'Intel Z390',
        toMerk: 'AM4'
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
