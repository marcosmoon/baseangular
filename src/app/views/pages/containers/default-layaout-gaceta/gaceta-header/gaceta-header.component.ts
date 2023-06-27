import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
  submenu: MenuItem[];
  isSubMenuOpen: boolean;
}
@Component({
  selector: 'app-gaceta-header',
  templateUrl: './gaceta-header.component.html',
  styleUrls: ['./gaceta-header.component.scss']
})
export class GacetaHeaderComponent implements OnInit {
  isSubMenuOpen: boolean = false;
  isMobileMenuOpen: boolean = false;
  selectedItem: any;
  menuItems = [
    {
      title: 'Inicio',
      route: '/index',
      submenu: [],
      isSubMenuOpen: false,
      
    },
    {
      title: 'Historia y Tradicion ',
      submenu: [
        { title: 'Historia', route: '/index/historia' },
        { title: 'Formas de vestir', route: '/index/formasvestir' },
        { title: 'Festividades', route: '/index/festividades' },
      ],
      isSubMenuOpen: true,
      isMobileMenuOpen:true
    },
    {
      title: 'Gobierno Transparente ',
      submenu: [
        { title: 'Estructura orgánica' },
        { title: 'Marco Normativo' },
        { title: 'Contacto' },
      ],
      isSubMenuOpen: true,
      isMobileMenuOpen:true
    },
    {
      title: 'Gaceta Oficial',
      route: '/index/gacetapdf',
    },
  ];

  menuItemsMovile = [
    {
      title: 'Inicio',
      route: '/index'
    },
    {
      title: 'Historia', route: '/index/historia'
    },
    { 
      title: 'Formas de vestir', route: '/index/formasvestir'
    },
    { 
      title: 'Festividades', route: '/index/festividades'
    },
    { 
      title: 'Estructura orgánica' 
    },
    { 
      title: 'Marco Normativo' 
    },
    { 
      title: 'Contacto' 
    },
    {
      title: 'Gaceta Oficial',
      route: '/index/gacetapdf',
    },
  ];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // toggleSubMenu(menuItem: MenuItem): void {
  //   menuItem.isSubMenuOpen = !menuItem.isSubMenuOpen;
  // }
  toggleSubMenu(event: Event): void {
    event.preventDefault();
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
  toggleMobileMenu(event: Event): void {
    event.preventDefault();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
