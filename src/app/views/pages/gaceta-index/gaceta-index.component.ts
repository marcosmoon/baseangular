import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ITicketResponse } from 'src/app/interfaces/ITicketResponse';
import { GacetaService } from 'src/app/services/core/gaceta.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
interface ImageSidebar {
  nombre: string;
  descripcion: string;
}
interface ImageGaleria {
  descripcion: string;
  rutaImagen: string;
}

interface ImageLevel5 {
  descripcion: string;
  fecha: string;
  rutaImagen: string;
  titulo: string;
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
  baseUrl: string = '../../../../assets/img/';

  images: ImageSidebar[] = [
    { nombre: 'lateral3.jpg', descripcion: 'PALACIO MUNICIPAL' },
    { nombre: 'lateral4.jpg', descripcion: 'QUIOSCO' },
    { nombre: 'lateral5.jpg', descripcion: 'SAN PEDRO TOTOLAPAM' }
  ];

  galeria: ImageGaleria[] = [
    { descripcion: "Amanecer San pedro Totolapam",rutaImagen: "galeria7.jpg"},
    { descripcion: "Rio San Pedro Totolapam",rutaImagen: "galeria8.jpg"},
    { descripcion: "Cultivo de Agave",rutaImagen: "galeria9.jpg"},
    { descripcion: "Principales Casas",rutaImagen: "galeria10.jpg"},
    { descripcion: "Rio Totolapam en tiempo de lluvias",rutaImagen: "galeria11.jpg"},
    { descripcion: "Casa de adobe antigua",rutaImagen: "galeria12.jpg"},
  ];

  imagesSPT: ImageLevel5[]  = [
    {descripcion: "SAN PEDRO TOTOLAPAM", fecha: "29 Junio", rutaImagen: "comunicacion4.jpg", titulo: "La festividad en honor a San Pedro se celebra 29 de Junio, comenzando el dia con calendas recorriendo las principales calles de la comunidad."},
    {descripcion: "SAN PEDRO TOTOLAPAM", fecha: "29 Junio", rutaImagen: "comunicacion5.jpg", titulo: "Todos los visitantes y personas de la comunidad se reunen en el centro para observar los diferentes torneos y bailables que organiza la autoridad."},
    {descripcion: "SAN PEDRO TOTOLAPAM", fecha: "29 Junio", rutaImagen: "comunicacion6.jpg", titulo: "Finalmente se culmina con un baile estelar, donde se presentan diversos grupos musicales de la region."}
  ];

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
    this.imagenMiniCarouselActual = this.imageMiniCarousel[0];
    this.indiceMiniCarouselActual = 0;
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

  imageMiniCarousel = [
    {
      rutaImagen: "minicarousel1.jpg",
      descripcion: "Cerro de la Cruz"
    },
    {
      rutaImagen: "minicarousel2.jpg",
      descripcion: "Entrada al templo"
    },
    {
      rutaImagen: "minicarousel3.jpg",
      descripcion: "Parroquia de la comunidad"
    },
  ];

  imagenMiniCarouselActual: any;
  indiceMiniCarouselActual: number;

  cambiarImagen(indice: number) {
    this.imagenMiniCarouselActual = this.imageMiniCarousel[indice];
    this.indiceMiniCarouselActual = indice;
  }

  siguienteImagen() {
    if (this.indiceMiniCarouselActual === this.imageMiniCarousel.length - 1) {
      this.cambiarImagen(0);
    } else {
      this.cambiarImagen(this.indiceMiniCarouselActual + 1);
    }
  }

  anteriorImagen() {
    if (this.indiceMiniCarouselActual === 0) {
      this.cambiarImagen(this.imageMiniCarousel.length - 1);
    } else {
      this.cambiarImagen(this.indiceMiniCarouselActual - 1);
    }
  }
}