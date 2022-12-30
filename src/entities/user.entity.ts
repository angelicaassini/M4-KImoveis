import { hashSync } from "bcryptjs";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import ScheduleUserProperty from "./scheduleUserProperty.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(
    () => ScheduleUserProperty,
    (schedule_user_property) => schedule_user_property.user
  )
  schedules_user_property: ScheduleUserProperty[];
}
export { User };

// import { v4 as uuid_generate_v4 } from "uuid";
// import { validate as uuidValidate } from "uuid";
