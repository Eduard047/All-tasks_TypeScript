import { BaseContent } from './BaseContent';

export type ContentOperations<T extends BaseContent> = {
    create: (content: T) => T;
    update: (id: string, updates: Partial<T>) => T;
    delete: (id: string) => boolean;
    getById: (id: string) => T | null;
    getAll: () => T[];
};
