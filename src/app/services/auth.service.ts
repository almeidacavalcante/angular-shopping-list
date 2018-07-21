import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AuthDaoService } from './auth-dao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dao: AuthDaoService) { }

  /**
   * save
   * @description Salva o usuário no backend
   * @param model trata-se do usuário que será salvo
   */
  public async save(model: User) {
    let user = await this.dao.create(model);
    console.log('User: ', user);
  }
}
