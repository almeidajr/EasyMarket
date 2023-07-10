import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ShoppingList } from './shopping-list.entity';

@Entity('shoppingListItems')
export class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  shoppingListId: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('real')
  quantity: number;

  @ManyToOne(
    () => ShoppingList,
    (shoppingList) => shoppingList.shoppingListItems,
  )
  shoppingList: ShoppingList;
}
