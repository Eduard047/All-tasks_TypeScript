import { Article } from './types/BaseContent';
import { createVersionedContent, updateVersion } from './types/Versioning';
import { articleValidator } from './types/Validators';

const article: Article = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
    title: "Sample Article",
    content: "This is a sample article.",
    author: "John Doe",
    tags: ["example", "typescript"],
};

const validation = articleValidator.validate(article);
if (!validation.isValid) {
    console.error("Validation failed:", validation.errors);
}

let versionedArticle = createVersionedContent(article);
versionedArticle = updateVersion(versionedArticle, { title: "Updated Title" });

console.log(versionedArticle);
