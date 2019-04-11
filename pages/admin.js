import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminContent from 'Components/admin/AdminContent';
import AdminLogin from 'Components/admin/AdminLogin';
import Loading from 'Components/Loading';
import Notification from 'Components/Notification';

import 'Sass/global.scss';

setGlobal({
    fetching: new Map(),
    isLogged: false,
    notifications: new Map(),
});

function Admin({attendees, gifts, hookContents, hooks, images, isLogged: logged}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');

    useEffect(() => {
        setGlobal({
            attendees: new Map(attendees.map(attendee => [attendee._id, attendee])),
            gifts: new Map(gifts.map(gift => [gift._id, gift])),
            hookContents: new Map(hookContents.map(hookContent => [hookContent._id, hookContent])),
            hooks: new Map(hooks.map(hook => [hook.name, hook])),
            images: new Map(images.map(image => [image._id, image])),
        });

        setIsLogged(logged);
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

Admin.getInitialProps = ({req, res: {attendees, gifts, hookContents, hooks, images, isLogged}}) => {
    return {
        attendees,
        gifts,
        hookContents,
        hooks,
        images,
        isLogged: !!isLogged,
    };
};

export default Admin;