import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { AppState } from '../../../stores/types/AppState';

interface Props {
  webAuthnSupported: AppState.SupportedType;
}

const mapStateToProps = (state: AppState.AppState) => {
  const webAuthnSupported = state.useragentState.webAuthnSupported;
  return {
    webAuthnSupported,
  };
};

const UnsupportedBrowserImpl: React.FunctionComponent<Props> = ({
  webAuthnSupported,
}) => {
  return (webAuthnSupported === 'unsupported') ? (
    <Segment>
      This browser does not support Web Authentication API.
    </Segment>
  ) : null;
};

export const UnsupportedBrowser = connect(mapStateToProps)(
  UnsupportedBrowserImpl,
);

