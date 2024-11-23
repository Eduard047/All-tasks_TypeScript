import { Article, Product } from './BaseContent';

export type ValidationResult = {
    isValid: boolean;
    errors?: string[];
};

export type Validator<T> = {
    validate: (data: T) => ValidationResult;
};

export const articleValidator: Validator<Article> = {
    validate: (data) => {
        const errors: string[] = [];
        if (!data.title) errors.push("Title is required.");
        if (!data.content) errors.push("Content is required.");
        return { isValid: errors.length === 0, errors };
    },
};

export const productValidator: Validator<Product> = {
    validate: (data) => {
        const errors: string[] = [];
        if (!data.name) errors.push("Name is required.");
        if (data.price <= 0) errors.push("Price must be greater than zero.");
        return { isValid: errors.length === 0, errors };
    },
};
