import * as ReactDOM from 'react-dom';

export const selectRenderer = (element: HTMLElement | null): ReactDOM.Renderer => {
  if (!element) {
    throw new Error('Failed to get renderer element.');
  }

  if (element.children.length === 0) {
    return ReactDOM.render;
  } else {
    return ReactDOM.hydrate;
  }
};
