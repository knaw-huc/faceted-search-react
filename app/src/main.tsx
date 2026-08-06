import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Design from './design';
import Context from './context';

function setUp() {
    const show = window.location.hash.slice(1).trim();
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            {show === 'context' ? <Context/> : <Design/>}
        </StrictMode>
    );
}

window.addEventListener('hashchange', setUp);
setUp();
