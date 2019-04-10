import React, {useEffect} from 'react';
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

import {add as addStore} from 'Helpers/store';

import useGlobalMap from 'Hooks/useGlobalMap';

import UserPrototype from 'Prototypes/User';

import bitsOurStory from 'Consts/bits/ourStory';
import bitsGamePlan from 'Consts/bits/gamePlan';
import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

import 'Sass/global.scss';

setGlobal({
    attendees: new Map(),
    activeItem: 0,
    breakpoint: '',
    fetching: new Map(),
    gifts: new Map(),
    images: new Map(),
    isLogged: false,
    isRetina: false,
    isSliderLight: false,
    notifications: new Map(),
});

function Index({attendees, gifts, hooks, hookContents, images}) {
    const [, addAttendee] = useGlobalMap('attendees');
    const [, addGift] = useGlobalMap('gifts');
    const [, addImage] = useGlobalMap('images');
    const [, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');
    addStore('hooks', new Map(hooks.map(hook => [hook.name, hook])));
    addStore('hookContents', new Map(hookContents.map(hookContent => [hookContent._id, hookContent])));

    useEffect(() => {
        const admin = new UserPrototype('admin');

        setIsLogged(admin.isLogged());
        attendees && attendees.forEach(attendee => addAttendee(attendee._id, attendee));
        gifts && gifts.forEach(gift => addGift(gift._id, gift));
        images && images.forEach(image => addImage(image._id, image));
    }, []);

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