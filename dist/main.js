"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Versioning_1 = require("./types/Versioning");
const Validators_1 = require("./types/Validators");
const article = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
    title: "Sample Article",
    content: "This is a sample article.",
    author: "John Doe",
    tags: ["example", "typescript"],
};
const validation = Validators_1.articleValidator.validate(article);
if (!validation.isValid) {
    console.error("Validation failed:", validation.errors);
}
let versionedArticle = (0, Versioning_1.createVersionedContent)(article);
versionedArticle = (0, Versioning_1.updateVersion)(versionedArticle, { title: "Updated Title" });
console.log(versionedArticle);
