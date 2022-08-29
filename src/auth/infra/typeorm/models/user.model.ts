import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user', { schema: 'auth' })
export class UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  session: string;

  @Column()
  password: string;

  @Column()
  fullName: string;
}
