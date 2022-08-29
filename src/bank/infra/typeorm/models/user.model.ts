import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum AccountTypeModel {
  shopkeeper,
  customer,
}
@Entity('user', { schema: 'bank' })
export class UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  balanceInCents: number;

  @Column({ type: 'enum', enum: AccountTypeModel })
  accountType: AccountTypeModel;
}
