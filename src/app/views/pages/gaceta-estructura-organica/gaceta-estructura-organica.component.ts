import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaceta-estructura-organica',
  templateUrl: './gaceta-estructura-organica.component.html',
  styleUrls: ['./gaceta-estructura-organica.component.scss']
})


export class GacetaEstructuraOrganicaComponent implements OnInit {
  baseUrl: string = '../../../../assets/img/Estructura.png';

  constructor() { }

  ngOnInit(): void {
  }

}
