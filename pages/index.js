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
import Images from 'Components/Images';
import Menu from 'Components/menu/Menu';
import Navigation from 'Components/Navigation';
import Notification from 'Components/Notification';
import OurStory from 'Components/OurStory';

import useGlobalMap from 'Hooks/useGlobalMap';

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
    isRetina: false,
    isSliderLight: false,
    notifications: new Map(),
});

function Index({attendees, gifts, images}) {
    const [, addAttendee] = useGlobalMap('attendees');
    const [, addGift] = useGlobalMap('gifts');
    const [, addImage] = useGlobalMap('images');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
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
                <div id={'galerie'}>
                    <Images/>
                </div>
            </Navigation>
        </div>
    );
}

Index.getInitialProps = ({req, res: {attendees, gifts, images}}) => {
    return {
        attendees,
        gifts,
        images,
    };
};

export default Index;