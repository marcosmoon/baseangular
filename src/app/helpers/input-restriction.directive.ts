import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[InputRestriction]'
})
export class InputRestrictionDirective {

  @Input('InputRestriction') InputRestriction!: string;

  constructor(private element: ElementRef, private readonly control: NgControl) {

  }

  @HostListener('keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    var reestriction = this.InputRestriction.toUpperCase();

    switch (reestriction) {
      case 'UPPERCASE':
        var regex = new RegExp('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]');
        var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
          return true;
        }
        break;
      
      case 'NUMBERS':
        var regex = new RegExp('[0-9]');
        var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
          return true;
        }
        break;
      
    }

    event.preventDefault();
    return false;
  }

  @HostListener('blur')
  onBlur() {
    let valuefield = (this.element.nativeElement as HTMLInputElement).value;
    var reestriction = this.InputRestriction.toUpperCase();

    switch (reestriction) {
      case 'UPPERCASE':
        valuefield = valuefield.toUpperCase().replace(/ +/g, ' ');
        break;
      case 'NUMBERS':
        valuefield = valuefield.replace(/ +/g, '');
        break;
      
    }

    this.control.control?.setValue(valuefield.trim());
  }
}
