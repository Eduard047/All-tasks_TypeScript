import { BaseContent } from './BaseContent';

export type Role = 'admin' | 'editor' | 'viewer';

export type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

export type AccessControl<T extends BaseContent> = {
    [role in Role]: {
        [K in keyof T]?: Permission;
    };
};
