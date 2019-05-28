import React from 'react';
import { BrowserRouter, withRouter } from "react-router-dom";

const RouterContext = React.createContext()
RouterContext.displayName = "RouterContext"

function useRouter() {
  const { location, history } = React.useContext(RouterContext)

  return {
    location,
    history
  }
}

function RouterProvider({ children }) {
  return (
    <BrowserRouter>
      <RouterConsumer>
        {children}
      </RouterConsumer>
    </BrowserRouter>
  )
}

function RouterConsumer({ location, history, children }) {
  return (
    <RouterContext.Provider value={{ location, history }}>
      {children}
    </RouterContext.Provider>
  )
}

// eslint-disable-next-line no-func-assign
RouterConsumer = withRouter(RouterConsumer)

export default RouterProvider;

export {
  RouterContext,
  useRouter
}