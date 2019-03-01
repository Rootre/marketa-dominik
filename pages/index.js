import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import Gifts from 'Components/Gifts';
import Menu from 'Components/menu/Menu';
import OurStory from 'Components/OurStory';

import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

import 'Sass/global.scss';
import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import useGlobalMap from "../hooks/useGlobalMap";

setGlobal({
    activeItem: 0,
    breakpoint: '',
    gifts: new Map(),
    isRetina: false,
    notifications: new Map(),
});

const bits = [
    {
        image: 'https://via.placeholder.com/400x520',
        text: 'Lorem ipsum',
        title: 'Jak jsme začali',
    },
    {
        image: 'https://via.placeholder.com/400x520',
        text: 'Lorem ipsum',
        title: 'Co jsme spolu strávili',
    },
    {
        image: 'https://via.placeholder.com/400x520',
        text: 'Lorem ipsum',
        title: 'Jak někdo požádal o ruku',
    },
    {
        image: 'https://via.placeholder.com/400x520',
        text: 'Lorem ipsum',
        title: 'Bereme se!',
    },
];

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
            <Claim heading={'Markéta & Dominik'} date={TheDate}/>
            <Menu items={menuItems}/>
            <Navigation>
                <div id={'my'}>
                    <AboutUs/>
                    <Countdown date={TheDate}/>
                </div>
                <div id={'jak-se-to-semlelo'}>
                    <OurStory bits={bits}/>
                </div>
                <div id={'dary'}>
                    <Gifts/>
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