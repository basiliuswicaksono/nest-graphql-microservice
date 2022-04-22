import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Order {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  user_id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
