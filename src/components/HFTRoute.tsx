// ts-ignore

import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import HFTemplate from './Header-Footer-Template';

interface HFTRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const HFTRoute = (props: HFTRouteProps): JSX.Element => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <HFTemplate>
          <Component {...routeProps} />
        </HFTemplate>
      )}
    />
  );
};

export default HFTRoute;
