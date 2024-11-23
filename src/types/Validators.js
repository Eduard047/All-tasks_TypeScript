"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = exports.articleValidator = void 0;
exports.articleValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.title)
            errors.push("Title is required.");
        if (!data.content)
            errors.push("Content is required.");
        return { isValid: errors.length === 0, errors };
    },
};
exports.productValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.name)
            errors.push("Name is required.");
        if (data.price <= 0)
            errors.push("Price must be greater than zero.");
        return { isValid: errors.length === 0, errors };
    },
};
