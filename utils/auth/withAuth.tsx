import React, { Component } from 'react';

export const withAuthComponent = (El: typeof Component) => ({
  user,
  data,
}: {
  user: unknown;
  data: {
    props: unknown;
  };
}) => {
  if (!user) {
    return <h1>Denied</h1>;
  }
  return <El {...data.props} />;
};
