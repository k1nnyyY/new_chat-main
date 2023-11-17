import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";

export const ServiceContext = React.createContext();

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMDY4ODY2LCJleHAiOjE3MDc4NDQ4NjZ9.OqPvE_l5MczjoHEc_GIHtVclCE4I8v7jEXSaYHnBk6U"
    }
  });
  return forward(operation);
});

const storageLink = new HttpLink({
  uri: 'https://korpustage.ru/storage'
});

const httpLink = new HttpLink({
  uri: 'https://korpustage.ru/dialogs',  
});

const searchLink = new HttpLink({
  uri: 'https://korpustage.ru/search'
});

const profileLink = new HttpLink({
  uri: 'https://korpustage.ru/profile'
})

const wsLink = new WebSocketLink(
  new SubscriptionClient("wss://korpustage.ru/dialogs", {
    reconnect: true,
    connectionParams: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMDY4ODY2LCJleHAiOjE3MDc4NDQ4NjZ9.OqPvE_l5MczjoHEc_GIHtVclCE4I8v7jEXSaYHnBk6U', // Здесь передайте ваш accessToken
    },
  })
)


const client = new ApolloClient({
  link:
      ApolloLink.split(
          operation => operation.getContext().clientName === 'search',
          authLink.concat(searchLink), // if above 
            ApolloLink.split(
                operation => operation.getContext().clientName === 'storage',
                authLink.concat(storageLink),
                ApolloLink.split(
                  operation => operation.getContext().clientName === 'profile',
                  authLink.concat(profileLink),
                  authLink.concat(httpLink)))),
  cache: new InMemoryCache()
});

const webSocketClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
})

const ServiceProvider = ({ children }) => {
  return (
    <ServiceContext.Provider
      value={{
        client,
        webSocketClient
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
export default ServiceProvider;