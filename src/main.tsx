import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Design from './design';
import Context from './context';
import {IntlProvider} from "react-intl";
import appMessages from './i18n/NL.json';

function setUp() {
    const show = window.location.hash.slice(1).trim();
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <IntlProvider locale={'NL'} messages={appMessages}>
                {show === 'context' ? <Context/> : <Design/>}
            </IntlProvider>
        </StrictMode>
    );
}

window.addEventListener('hashchange', setUp);
setUp();
