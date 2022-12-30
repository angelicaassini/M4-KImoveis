import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Address from "./address.entity";
import Category from "./category.entity";
import ScheduleUserProperty from "./scheduleUserProperty.entity";

@Entity("properties")
class Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "float" })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.properties)
  category: Category;

  @OneToMany(
    () => ScheduleUserProperty,
    (schedule_user_property) => schedule_user_property.property
  )
  schedules_user_property: ScheduleUserProperty[];
}
export default Property;
