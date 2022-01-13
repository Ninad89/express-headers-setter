import { NextFunction, Request, Response } from 'express';

function getMiddleware({
    dynamicHeaders = {},
    staticHeaders = {},
    copyFromRequestHeaders = [],
}: IConfig = {}) {
    return (req: Request, res: Response, next: NextFunction) => {
        const copiedFromRequestHeaders: any = {};
        for (const header of copyFromRequestHeaders) {
            copiedFromRequestHeaders[header] = req.get(header);
        }
        const dynamicResolvedHeaders: any = {};
        for (const header in dynamicHeaders) {
            if (typeof dynamicHeaders[header] === 'function') {
                dynamicResolvedHeaders[header] = dynamicHeaders[header](req);
            }
        }
        const combinedHeaders = Object.assign(
            {},
            staticHeaders,
            copiedFromRequestHeaders,
            dynamicResolvedHeaders,
        );
        res.set(combinedHeaders);
        next();
    };
}

export interface IConfig {
    staticHeaders?: IStaticValues;
    dynamicHeaders?: IDynamicValues;
    copyFromRequestHeaders?: string[];
}

interface IStaticValues {
    [key: string]: string;
}

interface IDynamicValues {
    [key: string]: (arg0: Request) => string;
}

export default getMiddleware;
