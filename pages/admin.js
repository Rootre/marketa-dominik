import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminContent from '../components/admin/AdminContent';
import AdminLogin from '../components/admin/AdminLogin';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import UserPrototype from 'Prototypes/User';

import '../static/sass/global.scss';
import useGlobalMap from "../hooks/useGlobalMap";

setGlobal({
    attendees: new Map(),
    fetching: new Map(),
    gifts: new Map(),
    images: new Map(),
    isLogged: false,
    notifications: new Map(),
});

function Admin({attendees, gifts, images}) {
    const [, addAttendee] = useGlobalMap('attendees');
    const [, addGift] = useGlobalMap('gifts');
    const [, addImage] = useGlobalMap('images');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');


    useEffect(() => {
        const admin = new UserPrototype('admin');

        setIsLogged(admin.isLogged());
        attendees && attendees.forEach(attendee => addAttendee(attendee._id, attendee));
        gifts && gifts.forEach(gift => addGift(gift._id, gift));
        images && images.forEach(image => addImage(image._id, image));
        setIsLoaded(true);
    }, []);

    return (
        <div>
            <Head>
                <title>{`Svatba Markéty a Dominika | admin sekce`}</title>
            </Head>


            <Notification notifications={notifications}/>
            {isLoaded ? isLogged ? (
                <AdminContent/>
            ) : (
                <AdminLogin/>
            ) : (
                <Loading/>
            )}
        </div>
    );
}

Admin.getInitialProps = ({req, res: {attendees, gifts, images}}) => {
    return {
        attendees,
        gifts,
        images,
    };
};

export default Admin;