import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Property from "./property.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.category, { eager: true })
  properties: Property[];
}
export default Category;
