import React from 'react';
import Head from 'next/head';
import {setGlobal} from 'reactn';

import AboutUs from 'Components/about-us/AboutUs';
import BreakpointWatcher from 'Components/BreakpointWatcher';
import Claim from 'Components/Claim';
import Countdown from 'Components/Countdown';
import Menu from 'Components/menu/Menu';
import OurStory from 'Components/OurStory';

import menuItems from 'Consts/menu';
import TheDate from 'Consts/TheDate';

import 'Sass/global.scss';
import Navigation from "../components/Navigation";

setGlobal({
    activeItem: 0,
    breakpoint: '',
    isRetina: false,
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

function Index() {
    return (
        <div>
            <BreakpointWatcher/>
            <Head>
                <title>{`Markéta &amp; Dominik | Svatba`}</title>
            </Head>
            <Claim heading={'Markéta & Dominik'} date={TheDate}/>
            <Menu items={menuItems}/>
            <Navigation>
                <div>
                    <AboutUs/>
                    <Countdown date={TheDate}/>
                </div>
                <div>
                    <OurStory bits={bits}/>
                </div>
            </Navigation>
        </div>
    );
}

export default Index;