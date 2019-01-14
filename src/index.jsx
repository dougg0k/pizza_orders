import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/configureStore";
import { Routes } from "./Routes";

const client = new ApolloClient({
  uri: "https://core-graphql.dev.waldo.photos/pizza",
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
