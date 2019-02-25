import React from 'react';
import Head from 'next/head';
import {setGlobal} from 'reactn';

import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import Menu from 'Components/menu/Menu';
import BreakpointWatcher from 'Components/BreakpointWatcher';

import 'Sass/global.scss';

setGlobal({
    breakpoint: '',
    isRetina: false,
});

function Index() {
    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta &amp; Dominik | Svatba`}</title>
            </Head>
            <Claim heading={'Markéta & Dominik'} date={'někdy v květnu...'}/>
            <Menu items={[
                {
                    title: 'Jak se to semlelo',
                    link: '#jak-se-to-semlelo',
                },
                {
                    title: 'Co by se nám hodilo',
                    link: '#co-by-se-nam-hodilo',
                },
                {
                    title: 'Kdy a kde',
                    link: '#kdy-a-kde',
                },
            ]}/>
            <Countdown date={new Date().setDate(new Date().getDate()+1)}/>
        </div>
    );
}

export default Index;