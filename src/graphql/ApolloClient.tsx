// src/apolloClient.tsx
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'

// Crear el enlace HTTP para conectar con tu servidor GraphQL
const httpLink = createHttpLink({
    uri: 'https://syn-api-prod.herokuapp.com/graphql', // Reemplaza con tu URL de GraphQL
})
// Configurar el enlace de autenticación (Bearer Token)
const authLink = setContext((_, { headers }) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiZjIzYTQyNmMtNDg2ZC00OTE0LTkyNTAtOTM5M2Y0MDYwZDc4IiwicHJvamVjdElkIjoiNmMxNzBmZDItZDlmOS00OWUzLWJhMDQtMTcyZjI2NzM4OTBhIiwiZnVsbE5hbWUiOiJFRElTT04gR1JFR09SSU8gUEFSSUEgRkVSTkFOREVaIiwiZW1haWwiOiJlZGlzb25wYXJpYUBnbWFpbC5jb20iLCJpYXQiOjE3MjQxNzIwODd9.vChzNyvSZQ2Y3941KHZ2cE4oYBCbwcTzp-mjAvOhhUk'
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    }
})

// Crear el cliente Apollo
const client = new ApolloClient({
    link: authLink.concat(httpLink), // Enlaza la autenticación con las peticiones
    cache: new InMemoryCache(), // Usamos un cache en memoria
})

// Proveedor de Apollo para envolver la aplicación
export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
