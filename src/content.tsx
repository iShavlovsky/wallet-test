import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import AppDapp from './App-dapp.tsx';

const container = document.createElement('div') as HTMLElement;
container.id = 'crx-root';
document.body.appendChild(container);
const root = createRoot(container);

root.render(
    <StrictMode>
        <HashRouter>
            <AppDapp />
        </HashRouter>
    </StrictMode>
);
