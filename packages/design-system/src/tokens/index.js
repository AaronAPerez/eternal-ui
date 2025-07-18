"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
__exportStar(require("./colors"), exports);
__exportStar(require("./typography"), exports);
__exportStar(require("./spacing"), exports);
__exportStar(require("./shadows"), exports);
// Re-export all tokens as a single object
const colors_1 = require("./colors");
const typography_1 = require("./typography");
const spacing_1 = require("./spacing");
const shadows_1 = require("./shadows");
exports.tokens = {
    colors: colors_1.colors,
    typography: typography_1.typography,
    spacing: spacing_1.spacing,
    shadows: shadows_1.shadows
};
