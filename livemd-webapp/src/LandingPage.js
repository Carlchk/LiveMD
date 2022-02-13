import LoginButton from './component/loginBtn'
import Profile from './Profile'
import NonLoginPage from './nonLoginPage'
import Footer from './component/LandingFooter'
import React from 'react'


import { useAuth0 } from "@auth0/auth0-react";

export function LandingPage() {
  // const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  // console.log(isAuthenticated)
  // if (isLoading) return <>Loading</>

  return (
    <div className="LandingPage">
      <NonLoginPage />
      <Footer />
    </div>
  );
}

