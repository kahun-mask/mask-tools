import * as React from 'react';

interface Props {
  loading: boolean;
  render(): React.ReactNode;
  renderLoader(): React.ReactNode;
}

const defaultRender = (): React.ReactNode => null;
const defaultRenderLoader = (): React.ReactNode => (
  <p>...loading</p>
);

export class Loader extends React.PureComponent<Props> {
  static defaultProps: Readonly<Props> = {
    loading: false,
    render: defaultRender,
    renderLoader: defaultRenderLoader,
  };
  render(): React.ReactNode {
    const {
      loading,
      render,
      renderLoader,
    } = this.props;
    if (loading) {
      return renderLoader();
    } else {
      return render();
    }
  }
}