import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../models/user';
import { GroupsService } from './groups.service';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private groupsService: GroupsService,
  ) { }

  // updateProductList(productList: Product[]): Observable<Group> {
  //   this.dataService.userGroup.shoppingList = productList;
  //   return this.groupsService.updateGroup(this.dataService.userGroup).pipe(map(group => {
  //     this.d.userGroup = group;
  //     this.authService.updateLocalStorage('userGroup', group);
  //     return group;
  //   }));
  // }

  // // refreshProductList(): Observable<Product[]> {
  // //   return this.groupsService.searchGroupByToken(this.authService.userGroup.token).pipe(map(group => group[0].shoppingList));
  // // }
}

