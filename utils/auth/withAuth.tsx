import React from 'react';

export function withAuthComponent(Component: any) {
  return ({ user, data }: { user: any; data: any }) => {
    if (!user) {
      return <h1>Denied</h1>;
    }
    return <Component {...data.props} />;
  };
}
