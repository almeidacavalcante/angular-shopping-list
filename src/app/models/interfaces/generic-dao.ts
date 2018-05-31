export interface GenericDao<T> {

    create(model: T): Promise<T>;

    update(model: any): Promise<T>;

    delete(id: number | string): Promise<T>;

    get(id: number | string): Promise<T|any>;

    getAll(): Promise<T[]>;
    
}