import React, {useEffect} from 'react';
import Head from 'next/head';
import {setGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import GamePlan from 'Components/GamePlan';
import Gifts from 'Components/Gifts';
import Menu from 'Components/menu/Menu';
import Navigation from 'Components/Navigation';
import Notifications from 'Components/Notifications';
import OurStory from 'Components/OurStory';

import useGlobalMap from 'Hooks/useGlobalMap';

import bitsOurStory from 'Consts/bits/ourStory';
import bitsGamePlan from 'Consts/bits/gamePlan';
import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

import 'Sass/global.scss';

setGlobal({
    activeItem: 0,
    breakpoint: '',
    fetching: new Map(),
    gifts: new Map(),
    isRetina: false,
    notifications: new Map(),
});

function Index({gifts}) {
    const [, addGift] = useGlobalMap('gifts');

    useEffect(() => {
        gifts.forEach(gift => addGift(gift._id, gift));
    }, []);

    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta & Dominik | Svatba`}</title>
            </Head>
            <Notifications/>
            <Navigation>
                <div id={'intro'}>
                    <Claim heading={'Markéta & Dominik'} date={TheDate}/>
                    <Menu items={menuItems}/>
                </div>
                <div id={'my'}>
                    <AboutUs/>
                    <Countdown date={TheDate}/>
                </div>
                <div id={'jak-se-to-semlelo'}>
                    <OurStory bits={bitsOurStory}/>
                </div>
                <div id={'dary'}>
                    <Gifts/>
                </div>
                <div id={'plan-dne'}>
                    <GamePlan bits={bitsGamePlan}/>
                </div>
            </Navigation>
        </div>
    );
}

Index.getInitialProps = ({req, res: {gifts}}) => {
    return {
        gifts,
    };
};

export default Index;