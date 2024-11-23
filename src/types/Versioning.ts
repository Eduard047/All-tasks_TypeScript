import { BaseContent } from './BaseContent';

export type Versioned<T extends BaseContent> = T & {
    version: number;
    changes: Partial<T>[];
};

export function createVersionedContent<T extends BaseContent>(content: T): Versioned<T> {
    return { ...content, version: 1, changes: [] };
}

export function updateVersion<T extends BaseContent>(
    versionedContent: Versioned<T>,
    updates: Partial<T>
): Versioned<T> {
    return {
        ...versionedContent,
        ...updates,
        version: versionedContent.version + 1,
        changes: [...versionedContent.changes, updates],
    };
}
