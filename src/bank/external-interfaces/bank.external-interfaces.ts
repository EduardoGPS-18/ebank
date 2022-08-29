export abstract class BankExternalInterface {
  abstract openAccount({ userId }: { userId: string }): Promise<void>;
}
