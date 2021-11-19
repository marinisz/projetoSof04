export interface Repository<T> {
    update: (model: T) => Promise<T>;
    create: (model: T) => Promise<T>;
    read: (model: T) => Promise<T>;
    delete: (model: T) => Promise<void>;
    keylist(): (model: T) => Promise<string[]>;
    count(): (model: T) => Promise<number>;
}
