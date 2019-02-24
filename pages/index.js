import React, {useEffect} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import Menu from 'Components/menu/Menu';
import BreakpointWatcher from 'Components/BreakpointWatcher';

import 'Sass/global.scss';

setGlobal({
    breakpoint: '',
    isRetina: false,
});

function Index() {
    const [breakpoint] = useGlobal('breakpoint');

    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta &amp; Dominik | Svatba`}</title>
            </Head>
            <h1>Markéta &amp; Dominik</h1>

            <Menu/>
        </div>
    );
}

export default Index;