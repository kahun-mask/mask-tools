"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * detect JavaScript’s environment.
 */
exports.isServer = function () {
    return !(typeof window === 'undefined'
        || !window.document);
};
//# sourceMappingURL=environmentUtils.js.map