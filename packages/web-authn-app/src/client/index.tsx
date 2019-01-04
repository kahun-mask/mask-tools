import * as React from 'react';
import { Provider } from 'react-redux';
import { IndexPage } from '../universal/components/pages/IndexPage';
import { createAppStore } from '../universal/stores';
import { webAuthnCheck } from '../universal/stores/actions/useragentAction';
import { selectRenderer } from './utils/reactUtils';

(async () => {

  const store = createAppStore({});
  const element = document.getElementById('app');
  const renderer = selectRenderer(element);

  store.dispatch(webAuthnCheck());
  renderer(
    <Provider store={store}>
      <IndexPage />
    </Provider>,
    element,
  );

})();
