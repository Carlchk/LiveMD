import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Spinner from '../component/Spinner'

import { withAuthenticationRequired } from "@auth0/auth0-react";

export default function PrivateRoute({ component, ...args }) {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
};