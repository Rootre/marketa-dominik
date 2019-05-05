import React from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Gallery from 'Components/Gallery';
import Menu from 'Components/menu/Menu';
import Navigation from 'Components/Navigation';
import Notification from 'Components/Notification';
import OurStory from 'Components/OurStory';

import bitsOurStory from 'Consts/bits/ourStory';
import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

import 'Sass/global.scss';

setGlobal({
    activeItem: 0,
    breakpoint: '',
    fetching: new Map(),
    gifts: new Map(),
    hookContents: new Map(),
    hooks: new Map(),
    isLogged: false,
    isRetina: false,
    isSliderLight: false,
    notifications: new Map(),
});

function Index({attendees, gifts, hookContents, hooks, images, isLogged: logged}) {
    setGlobal({
        isLogged: logged,
        gifts: new Map(gifts.map(gift => [gift._id, gift])),
        hookContents: new Map(hookContents.map(hookContent => [hookContent._id, hookContent])),
        hooks: new Map(hooks.map(hook => [hook.name, hook])),
    });

    const [notifications] = useGlobal('notifications');

    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta & Dominik | Svatba`}</title>
            </Head>
            <Notification notifications={notifications}/>

            <Navigation>
                <div id={'intro'}>
                    <Claim heading={'Markéta a Dominik'} date={TheDate}/>
                    <Menu items={menuItems}/>
                </div>
                <div id={'my'}>
                    <AboutUs/>
                </div>
                <div id={'jak-se-to-semlelo'}>
                    <OurStory bits={bitsOurStory}/>
                </div>
                <div id={'galerie'}>
                    {logged && <Gallery images={images}/>}
                </div>
            </Navigation>
        </div>
    );
}

Index.getInitialProps = async ({req, res: {attendees, gifts, hookContents, hooks, images, isLogged}}) => {
    return {
        attendees,
        gifts,
        hookContents,
        hooks,
        images,
        isLogged: !!isLogged,
    };
};

export default Index;