import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ALERT_TYPE } from '../../constants/alert.constants';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) {
    Swal.fire(title, message, type);
  }

  showConfirmation(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showToast(
    message: string,
    position: 'top' | 'bottom' | 'center' = 'top',
    typeIcon = ALERT_TYPE.SUCCESS,
    timerProgressBar: boolean = false,
    ) {
    Swal.fire({
      toast: true,
      position,
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: message,
    });
  }
}
