import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Property from "./property.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class ScheduleUserProperty {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Property, (property) => property.schedules_user_property)
  property: Property;

  @ManyToOne(() => User, (user) => user.schedules_user_property)
  user: User;
}
export default ScheduleUserProperty;
