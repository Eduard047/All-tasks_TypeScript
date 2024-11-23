"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVersionedContent = createVersionedContent;
exports.updateVersion = updateVersion;
function createVersionedContent(content) {
    return Object.assign(Object.assign({}, content), { version: 1, changes: [] });
}
function updateVersion(versionedContent, updates) {
    return Object.assign(Object.assign(Object.assign({}, versionedContent), updates), { version: versionedContent.version + 1, changes: [...versionedContent.changes, updates] });
}
