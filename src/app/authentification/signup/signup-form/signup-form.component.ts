import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  @Input() singUpType = {
    title: 'Sign in',
    id: 'string',
    label: 'string',
    placeholder: 'string',
  };

  signupForm: FormGroup;
  isVisible: boolean = false;
  type: string = 'password';
  invalidUser: boolean = false;
  invalidGroup: boolean = false;
  invalidPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      group: ['', Validators.required],
      password: ['', [Validators.required, this.customValidators.patternValidator()]],
      passwordConfirm: ['', [Validators.required]],
    },
      {
        validator: this.customValidators.matchPassword('password', 'passwordConfirm'),
      }
    );
    this.signupForm.reset()
  }

  onSubmit(form: FormGroup): void {
    this.spinner.show();
    if (form.valid) {
      delete form.value.passwordConfirm;
      switch (this.singUpType.id) {
        case 'createModal':
          this.authService.signUpCreate(form.value).subscribe(
            res => {
              this.router.navigate(['/login']);
            },
            error => {
              this.invalidUser = error.status === 409;
            });
          break;
        case 'joinModal':
          this.authService.signUpJoin(form.value).subscribe(
            res => {
              this.router.navigate(['/login']);
            },
            error => {
              this.invalidUser = error.status === 409;
              this.invalidGroup = error.status === 404;
            });
          break;
      }
    }
    this.signupForm.reset();
    this.spinner.hide();
  }

  showPswd(): void {
    if (this.isVisible) {
      this.isVisible = false;
      this.type = 'password';
    } else {
      this.isVisible = true;
      this.type = 'text';
    }
  }

}
