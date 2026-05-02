"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const LOG_API_URL = '/api/evaluation-service/logs';
const Log = (stack, level, packageName, message) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        stack,
        level,
        package: packageName,
        message
    };
    try {
        const response = yield fetch(LOG_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            // Fallback if the remote logger fails
            console.warn('Logging to API failed:', yield response.text());
        }
    }
    catch (error) {
        // If the network request fails entirely
        console.error('Failed to send log to API:', error);
    }
});
exports.Log = Log;
