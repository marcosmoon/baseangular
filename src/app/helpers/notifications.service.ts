import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  constructor() { }

  async success(options: any) {
    return Swal.fire(Object.assign({
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1e9ff2",
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }, options));
  }

  async warning(options: any) {
    return Swal.fire(Object.assign({
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1e9ff2",
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }, options));
  }

  async error(options: any) {
    return Swal.fire(Object.assign({
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1e9ff2",
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }, options));
  }

  async info(options: any) {
    return Swal.fire(Object.assign({
      icon: "info",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1e9ff2",
      showCloseButton: false,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }, options));
  }

  async question(options: any) {
    return Swal.fire(Object.assign({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: "#1e9ff2",
      cancelButtonText: 'Cancelar',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }, options));
  }
}
