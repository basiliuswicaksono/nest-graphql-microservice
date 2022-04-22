import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  product_id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
