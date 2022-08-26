export abstract class RepositoryInterface<T> {
  abstract update(entity: T): Promise<void>;
  abstract create(entity: T): Promise<void>;
}
