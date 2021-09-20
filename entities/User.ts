import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Index("phone", ["phone"], { unique: true })
@Entity("user", { schema: "apiperionica" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "surname", length: 50, default: () => "'0'" })
  surname: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 50,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", { name: "city", length: 50, default: () => "'0'" })
  city: string;

  @Column("varchar", { name: "address", length: 255, default: () => "'0'" })
  address: string;

  @Column("varchar", {
    name: "phone",
    unique: true,
    length: 50,
    default: () => "'0'",
  })
  phone: string;

  @Column("varchar", { name: "password_hash", length: 50 })
  passwordHash: string;
}
