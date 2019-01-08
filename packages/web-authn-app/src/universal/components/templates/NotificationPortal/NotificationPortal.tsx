import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react';
import { removeNotificationItem } from '../../../stores/actions/notificationPortalAction';
import { AppState } from '../../../stores/types/AppState';

interface Props {
  notification: AppState.NotificationPortalItem | null;
  open: boolean;
  closePortal(): void;
}

const mapStateToProps = (state: AppState.AppState) => {
  const notification = state.notificationPortalState.notification;
  const open = !!notification;
  return {
    notification,
    open,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePortal: () => dispatch(removeNotificationItem()),
});

const NotificationPortalImpl: React.FunctionComponent<Props> = ({
  closePortal,
  notification,
  open,
}) => {
  return (
    <React.Fragment>
      <TransitionablePortal open={open}>
        <Segment
          style={{
            left: '50%',
            marginLeft: '-150px',
            position: 'fixed',
            top: '40%',
            width: '300px',
            zIndex: 1000,
          }}
        >
          {!!notification ? (
            <React.Fragment>
              <Header>{notification.title}</Header>
              <p>{notification.message}</p>
              <Button onClick={closePortal}>Close</Button>
            </React.Fragment>
          ) : null}
        </Segment>
      </TransitionablePortal>
    </React.Fragment>
  );
};

export const NotificationPortal = connect(mapStateToProps, mapDispatchToProps)(
  NotificationPortalImpl,
);
