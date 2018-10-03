import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }


  showError(title, msg){
    swal({title: title, text: msg, type: "error"});
  }

  showSuccess(title, msg){
    swal({title: title, text: msg, type: "success"});
  }

  showWarning(title, msg){
    swal({title: title, text: msg, type: "warning"});
  }

  showLoading(msg, allowOutsideClick){
    swal({html: "<h2>" + msg + "</h2>", allowOutsideClick: allowOutsideClick});
    swal.showLoading();
  }

  hideLoading(){
    swal.hideLoading();
    swal.close();
  }
}
