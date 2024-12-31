import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import ReactiveStyle from './styles/ReactiveStyle';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ReactiveStyle/>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);