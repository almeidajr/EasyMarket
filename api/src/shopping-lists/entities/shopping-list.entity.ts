import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ShoppingListItem } from './shopping-list-item.entity';

@Entity('shoppingLists')
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  comments?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ShoppingListItem,
    (shoppingListItems) => shoppingListItems.shoppingList,
  )
  shoppingListItems: ShoppingListItem[];
}
