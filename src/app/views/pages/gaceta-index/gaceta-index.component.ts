import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ITicketResponse } from 'src/app/interfaces/ITicketResponse';
import { GacetaService } from 'src/app/services/core/gaceta.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
interface ImageSidebar {
  nombre: string;
  descripcion: string;
}
@Component({
  selector: 'app-gaceta-index',
  templateUrl: './gaceta-index.component.html',
  styleUrls: ['./gaceta-index.component.scss']
})


export class GacetaIndexComponent implements OnInit, OnDestroy {
  items: ITicketResponse[] = [];
  showModal: boolean = false;
  currentIndex: number = 0;
  isSubMenuOpen: boolean = false;
  subMenuStates: boolean[] = [];
  slidePosition = 0;
  interval: any;
  images: ImageSidebar[] = [
    { nombre: 'lateral3.jpg', descripcion: 'PALACIO MUNICIPAL' },
    { nombre: 'lateral4.jpg', descripcion: 'QUIOSCO' },
    { nombre: 'lateral5.jpg', descripcion: 'SAN PEDRO TOTOLAPAM' }
  ];
  baseUrl: string = '../../../../assets/img/';

  constructor(
    private gacetaService: GacetaService,
    private platformLocation: PlatformLocation,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.gacetaService.getAllSlider().subscribe(
      response => {
        this.items = response.data;
        console.log('imprimo lo que trae response.data');
        console.log(response.data);
  
        const image = new Image();
        image.onload = () => {
          const height = image.height;
          console.log('Altura de la imagen:', height);
        };
        image.src = 'ruta-de-la-imagen';
      },
      error => {
        console.error(error);
      }
    );
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 7000); // Cambiar cada 3 segundos (ajusta este valor según tus necesidades)
  }

  stopSlider() {
    clearInterval(this.interval);
  }

  previousSlide() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.items.length - 1;
    }
    this.slidePosition = -this.currentIndex * 100;
  }

  nextSlide() {
    this.currentIndex++;
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = 0;
    }
    this.slidePosition = -this.currentIndex * 100;
  }

  getSafeImageUrl(base64Image: string): SafeUrl {
    const imageUrl: string = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.slidePosition = -this.currentIndex * 100;
  }

  toggleSubMenu(menuKey: string) {
    if (this.subMenuStates[menuKey]) {
      this.subMenuStates[menuKey] = false;
    } else {
      this.subMenuStates = {
        ...this.subMenuStates,
        [menuKey]: true
      };
    }
  }

  openModal(index: number) {
    this.currentIndex = index;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  previousImage() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage() {
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }
  }

  isImageSmaller(image: string): Promise<boolean> {
    
    const minHeight = 900;
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log("Se imprime el tamanio de la imagen");
    console.log(image);
        resolve(img.height < minHeight);
      };
      img.onerror = () => {
        resolve(false); 
      };
      img.src = image;
    });
  }
}