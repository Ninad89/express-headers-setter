import express, { Request } from 'express';
import getSetHeaderMW, { IConfig } from '../src/index';
// import getSetHeaderMW from 'express-set-headers-mw';

const app = express();

app.use(express.json());

function resolveClientNameHeader(req: Request) {
    const client = req.header('client-id') === '1' ? 'client1' : 'unknown';
    return client;
}

const headerSetterConfig: IConfig = {
    copyFromRequestHeaders: ['x-transaction-id'],
    staticHeaders: {
        'cache-control': 'no-cache',
        'x-app-version': '1.0.0',
    },
    dynamicHeaders: {
        'x-client-name': resolveClientNameHeader,
    },
};
const headerSetter = getSetHeaderMW(headerSetterConfig);

app.use(headerSetter);
app.use('/', (req, res) => {
    res.send({ cool: 'beans' });
});

app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Listening at 3000');
});
