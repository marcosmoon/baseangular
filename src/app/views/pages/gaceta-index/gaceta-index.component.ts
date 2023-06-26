import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ITicketResponse } from 'src/app/interfaces/ITicketResponse';
import { GacetaService } from 'src/app/services/core/gaceta.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gaceta-index',
  templateUrl: './gaceta-index.component.html',
  styleUrls: ['./gaceta-index.component.scss']
})
export class GacetaIndexComponent implements OnInit, OnDestroy {
  items: ITicketResponse[] = [];
  currentIndex: number = 0;
  isSubMenuOpen: boolean = false;
  subMenuStates: boolean[] = [];
  slidePosition = 0;
  interval: any;

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
}