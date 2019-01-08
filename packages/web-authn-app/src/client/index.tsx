import * as React from 'react';
import { Provider } from 'react-redux';
import { IndexPage } from '../universal/components/pages/IndexPage';
import { createAppStore } from '../universal/stores';
import { webAuthnCheck } from '../universal/stores/actions/useragentAction';
import { selectRenderer } from './utils/reactUtils';

(async () => {

  const store = createAppStore(window.__STATE__);
  const element = document.getElementById('app');
  const renderer = selectRenderer(element);

  renderer(
    <Provider store={store}>
      <IndexPage />
    </Provider>,
    element,
    () => {
      // prepare
      store.dispatch(webAuthnCheck());
    },
  );

})();
