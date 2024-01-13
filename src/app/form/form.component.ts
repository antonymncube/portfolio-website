 // form.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.invalid);
  }
}
