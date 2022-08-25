export abstract class RepositoryInterface<T> {
  abstract create(entity: T): Promise<void>;
  abstract findByEmail({ email }: { email: string }): Promise<T>;
}
