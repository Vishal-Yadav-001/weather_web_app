import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-quickstart';

  signup = this.fb.group({
    email: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    favAnimal: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  formState(formControlName?: any) {
    return this.signup.get(formControlName);
  }

  submitForm() {
    this.storeData(this.signup?.controls);
  }
  storeData(form: any) {
    for (let key in form) {
      localStorage.getItem(key)
        ? localStorage.clear()
        : localStorage.setItem(key, form[key].value || null);
    }
  }
}
