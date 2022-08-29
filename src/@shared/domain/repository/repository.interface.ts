export abstract class RepositoryInterface<T> {
  abstract create(entity: T): Promise<void>;
}
