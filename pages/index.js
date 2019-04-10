import React from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import FormNewAttendee from 'Components/FormNewAttendee';
import GamePlan from 'Components/GamePlan';
import Gifts from 'Components/Gifts';
import Hook from 'Components/Hook';
import Menu from 'Components/menu/Menu';
import Navigation from 'Components/Navigation';
import Notification from 'Components/Notification';
import OurStory from 'Components/OurStory';

import UserPrototype from 'Prototypes/User';

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
    hookContents: new Map(),
    hooks: new Map(),
    images: new Map(),
    isLogged: false,
    isRetina: false,
    isSliderLight: false,
    notifications: new Map(),
});

function Index({attendees, gifts, hooks, hookContents, images}) {
    const admin = new UserPrototype('admin');

    setGlobal({
        isLogged: !!admin.isLogged(),
        gifts: new Map(gifts.map(gift => [gift._id, gift])),
        hookContents: new Map(hookContents.map(hookContent => [hookContent._id, hookContent])),
        hooks: new Map(hooks.map(hook => [hook.name, hook])),
        images: new Map(images.map(image => [image._id, image])),
    });

    const [notifications] = useGlobal('notifications');

    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta & Dominik | Svatba`}</title>
            </Head>
            <Notification notifications={notifications}/>
            <Hook name={'My'}/>
            <Navigation>
                <div id={'intro'}>
                    <Claim heading={'Markéta a Dominik'} date={TheDate}/>
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
                <div id={'prihlaste-se'}>
                    <FormNewAttendee/>
                </div>
            </Navigation>
        </div>
    );
}

Index.getInitialProps = async ({req, res: {attendees, gifts, hookContents, hooks, images}}) => {
    return {
        attendees,
        gifts,
        hookContents,
        hooks,
        images,
    };
};

export default Index;