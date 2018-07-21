import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl()
  })

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  /**
   * submit
   * @description Trata os dados do formulário de inclusão de usuário
   */
  public submit() {
    let user = new User(
      this.name.value,
      this.email.value,
      this.username.value,
      this.password.value);

    this.authService.save(user);
  }

  public get name(){
    return this.form.get('name');
  }
  public get email(){
    return this.form.get('email');
  }
  public get username(){
    return this.form.get('username');
  }
  public get password(){
    return this.form.get('password');
  }
  public get confirm(){
    return this.form.get('confirm');
  }
}
