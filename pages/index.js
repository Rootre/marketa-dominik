import React from 'react';
import Head from 'next/head';
import {setGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import Menu from 'Components/menu/Menu';
import Schedule from 'Components/schedule/Schedule';

import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

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
            <Claim heading={'Markéta & Dominik'} date={TheDate}/>
            <Menu items={menuItems}/>
            <AboutUs/>
            <Countdown date={TheDate}/>
            <Schedule/>
        </div>
    );
}

export default Index;