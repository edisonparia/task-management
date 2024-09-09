import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClientProvider } from './graphql/ApolloClient.tsx'
import { HashRouter as Router } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <ApolloClientProvider>
                <App />
            </ApolloClientProvider>
        </Router>
    </StrictMode>
)
