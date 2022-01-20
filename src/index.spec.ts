import { Request } from 'express';
import { mockRequest, mockResponse } from 'jest-mock-req-res';

import createSetHeadersMiddleware, { IConfig } from './index';

describe('First test', () => {
    it('Should return function ', () => {
        expect(typeof createSetHeadersMiddleware()).toBe('function');
    });

    it('Middleware should call next function', () => {
        const nextFun = jest.fn();
        const config = {};
        const mw = createSetHeadersMiddleware(config);
        const req = mockRequest();
        const res = mockResponse();

        mw(req, res, nextFun);

        expect(nextFun).toBeCalledTimes(1);
    });

    it('Middleware should set static header', () => {
        const nextFun = jest.fn();
        const config: IConfig = {
            staticHeaders: {
                'Accept-Language': 'en',
                'Cache-Control': 'no-cache',
            },
        };
        const mw = createSetHeadersMiddleware(config);
        const req = mockRequest();
        const res = mockResponse();

        mw(req, res, nextFun);

        expect(res.set).toHaveBeenCalledWith({
            'Accept-Language': 'en',
            'Cache-Control': 'no-cache',
        });
        expect(nextFun).toBeCalledTimes(1);
    });

    it('Middleware should set copy headers from request and set in response', () => {
        const reqHeaders = {
            'x-correlation-id': '111-222-333',
            'x-app': 'app-1',
            'x-test-1': 'val-1',
            'x-test-2': 'val2',
            'authorization': 'JWT',
        };
        const getReqHeader = jest.fn((arg) => reqHeaders[arg]);
        const nextFun = jest.fn();

        const config: IConfig = {
            copyFromRequestHeaders: ['x-correlation-id', 'x-app', 'x-test-1', 'x-test-2'],
        };

        const mw = createSetHeadersMiddleware(config);

        const req = mockRequest({ headers: reqHeaders, get: getReqHeader });
        const res = mockResponse();

        mw(req, res, nextFun);

        expect(res.set).toHaveBeenCalledWith({
            'x-correlation-id': '111-222-333',
            'x-app': 'app-1',
            'x-test-1': 'val-1',
            'x-test-2': 'val2',
        });
        expect(nextFun).toBeCalledTimes(1);
    });

    it('Middleware should set dynamically generated headers in the response', () => {
        const nextFun = jest.fn();
        const DATE_NOW = Date.now();

        const config: IConfig = {
            dynamicHeaders: {
                'x-date': (_: Request) => {
                    return DATE_NOW.toString(); // Date.now().toString();
                },
                'x-auth-jwt': (_: Request) => {
                    return 'JWT';
                },
                // @ts-expect-error
                'wrong-header': 'wrong-value',
            },
        };

        const mw = createSetHeadersMiddleware(config);

        const req = mockRequest();
        const res = mockResponse();

        mw(req, res, nextFun);

        expect(res.set).toHaveBeenCalledWith({
            'x-date': DATE_NOW.toString(),
            'x-auth-jwt': 'JWT',
        });
        expect(nextFun).toBeCalledTimes(1);
    });
});
