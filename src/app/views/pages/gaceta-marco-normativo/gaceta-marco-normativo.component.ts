import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaceta-marco-normativo',
  templateUrl: './gaceta-marco-normativo.component.html',
  styleUrls: ['./gaceta-marco-normativo.component.scss']
})
export class GacetaMarcoNormativoComponent implements OnInit {

  baseUrl: string = '../../../../assets/img/marconormativo.pdf';
  constructor() { }

  ngOnInit(): void {
  }
}
