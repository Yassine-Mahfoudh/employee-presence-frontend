import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  private duration = 2.5 * 2000;

  constructor(

    private snackbar: MatSnackBar
  ) {}

  success(translationKey: string, params = {}) {
    this.show(translationKey, params);
  }

  error(translationKey: string = "server_error", params = {}) {
    return this.showError(translationKey, params);
  }
  error2(params = {}) {
    return this.showError2(params);
  }

  showerror(translationKey, params = {}) {
    return this.showError(translationKey, params);
  }

  codeerror(translationKey: string = "code exist") {
    return this.showerror(translationKey);
  }

  loginexisit(translationKey: string = "login_exists") {
    return this.showerror(translationKey);
  }

  identifianterror(translationKey: string = "identifier_not_found") {
    return this.showerror(translationKey);
  }
  moiserrone(translationKey: string = "mois_errone") {
    return this.showerror(translationKey);
  }

  private show(translationKey: string, params = {}) {
    this.snackbar.open(translationKey, undefined, {
      duration: this.duration,
      panelClass: ["green-snackbar"],
    });
  }

  private showError(translationKey: string, params = {}) {
    this.snackbar.open(translationKey, undefined, {
      duration: this.duration,
      panelClass: ["red-snackbar"],
    });
  }
  private showError2(message) {
    this.snackbar.open(message, undefined, {
      duration: this.duration,
      panelClass: ["red-snackbar"],
    });
  }
}
