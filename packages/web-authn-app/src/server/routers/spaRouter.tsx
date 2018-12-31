import {
  Response,
  Request,
  Router,
} from 'express';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { IndexPage } from '../../universal/components/pages/IndexPage';
import { createAppStore } from '../../universal/stores';
import { asyncHandler } from '../utils/expressUtils';
import { oneliner } from '../utils/stringUtilts';

export const spaRouter = Router();

spaRouter.get('*', asyncHandler(async (req: Request, res: Response) => {

  const html = await new Promise((resolve, reject) => {
    let body = '';
    const store = createAppStore({});
    ReactDOM.renderToNodeStream(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    ).on('data', (chunk) => {
      body += chunk;
    }).on('error', (error) => {
      reject(error);
    }).on('end', () => {
      resolve(oneliner`
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>web authn app</title>
        </head>
        <body>
          <div id="app">${body}</div>
          <script src="/static/app.js"></script>
        </body>
      </html>
      `);
    });
  });

  res.send(html);

}));
