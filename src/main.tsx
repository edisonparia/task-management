import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClientProvider } from './graphql/ApolloClient.tsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ApolloClientProvider>
                <App />
            </ApolloClientProvider>
        </BrowserRouter>
    </StrictMode>
)
