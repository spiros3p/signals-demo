import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

interface ItemType {
  name: String;
  quantity: number;
  lastEditedBy: string | null;
}

@Component({
  selector: 'app-my-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-demo.component.html',
  styleUrls: ['./my-demo.component.scss'],
})
export class MyDemoComponent {
  newItemName!: string;
  newItemQuantity?: number;
  currentUser = signal('Spiros');
  items: ItemType[] = [
    { name: 'Apples', quantity: 5, lastEditedBy: null },
    { name: 'Bananas', quantity: 3, lastEditedBy: null },
    { name: 'Milk', quantity: 2, lastEditedBy: null },
  ];

  // RxJS - BehaviorSubject
  // totalQuantity: number = 0;
  // _itemListSubject = new BehaviorSubject<ItemType[]>(this.items);
  // itemList$ = this._itemListSubject.asObservable().pipe(
  //   tap((items) => {
  //     this.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  //   })
  // );

  valid = signal(false);

  // Signals
  itemList: WritableSignal<ItemType[]> = signal(this.items);
  totalQuantityOfItemsInList: Signal<number> = computed(() =>
    this.itemList().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    // Signals
    effect(() => {
      // this.items = this.itemList();

      if (this.valid()) {
        console.log(
          `There are ${this.totalQuantityOfItemsInList()} items in your list!`
        );
      } else {
        console.log('Hello');
      }
    });
  }

  addItem() {
    if (!this.newItemQuantity) return;

    this.valid.update((x) => !x);

    // RxJS - BehaviorSubject
    // this._itemListSubject.next([
    //   ...this._itemListSubject.value,
    //   {
    //     name: this.newItemName,
    //     quantity: this.newItemQuantity,
    //     lastEditedBy: this.currentUser(),
    //   },
    // ]);

    // Signals
    this.itemList.set([
      ...this.itemList(),
      {
        name: this.newItemName,
        quantity: this.newItemQuantity,
        lastEditedBy: this.currentUser(),
      },
    ]);

    // Clear the input fields
    this.newItemName = '';
    this.newItemQuantity = 0;
  }

  removeItem(item: ItemType) {
    // RxJS - BehaviorSubject
    // this._itemListSubject.next(
    //   this._itemListSubject.value.filter((i) => i !== item)
    // );

    // Signals
    this.itemList.set(this.itemList().filter((i) => i !== item));
  }
}

// // create a signal
// const name: WritableSignal<string> = signal<string>('Spiros');

// // set a signal
// name.set('Alex');

// // read a signal's value
// const firstName = name();

// // read-only signal
// const readonlyName = name.asReadonly();

// // update a signal
// const count = signal<number>(2);
// count.update((e) => e * 2);

// // mutate an object
// const user = signal({ name: 'Spiros', age: 26 });
// user.mutate((value) => {
//   value.age = 28;
//   value.name = 'Alex';
// });

// // mutate an array
// const countries = signal<string[]>(['Belgium', 'Philippines']);
// countries.mutate((value) => {
//   value.push('Greece');
// });

// // computed signal
// const costs = signal([10, 8]);
// const total: Signal<any> = computed(() => costs().reduce((a, b) => a + b));
// // console.log(total()); // logs: 18

// costs.mutate((items) => items.push(12));
// // console.log(total()); // logs: 30
