import { Component, OnInit } from '@angular/core';
import { AppState } from './store/models/app-state.model';
import { Store } from '@ngrx/store'
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction, ShoppingActionTypes, DeleteItemAction } from './store/actions/shopping.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  shoppingItems$: Observable<Array<ShoppingItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem = {id: '', name: ''};

  ngOnInit(): void {
    this.shoppingItems$ = this.store.select(store => store.shopping.list);  
    this.loading$ = this.store.select(store => store.shopping.loading);  
  }

  constructor(private store: Store<AppState>){}

  addItem(){
    this.newShoppingItem.id = uuid();    
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = {id: '', name: ''};
  }

  deleteItem(item: string){       
    this.store.dispatch(new DeleteItemAction(item));    
  }

}
