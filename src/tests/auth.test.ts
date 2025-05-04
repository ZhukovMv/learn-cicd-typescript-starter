import {describe, expect, test} from "vitest";
import {getAPIKey} from "../api/auth";
import {IncomingHttpHeaders} from "http";

describe("getAPIKey", () => {
    test("returns API key from headers", () => {
        const apiKey = "a6f33558-0911-485c-be04-dfec40560618"
        const headers = {
            "Content-Type": "application/json",
            "Content-Length": "123",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            authorization: `ApiKey ${apiKey}`
        } as IncomingHttpHeaders;

        const result = getAPIKey(headers);

        expect(result).toBe(apiKey);
    });

    test("returns null if authorization doesnt exist", () => {
        const apiKey = "a6f33558-0911-485c-be04-dfec40560618"
        const headers = {
            "Content-Type": "application/json",
            "Content-Length": "123",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            authorization: `Bearer ${apiKey}`
        } as IncomingHttpHeaders;

        const result = getAPIKey(headers);

        expect(result).toBeNull();
    });

    test("returns null if authorization  does not start with 'ApiKey'", () => {
        const headers = {
            "Content-Type": "application/json",
            "Content-Length": "123",
            "Accept-Encoding": "gzip, deflate, br, zstd",
        } as IncomingHttpHeaders;

        const result = getAPIKey(headers);

        expect(result).toBeNull();
    });

    test("returns null if authorization is malformed", () => {
        const headers = {
            "Content-Type": "application/json",
            "Content-Length": "123",
            "Accept-Encoding": "gzip, deflate, br, zstd",
        } as IncomingHttpHeaders;

        const result = getAPIKey(headers);

        expect(result).toBeNull();
    });
});