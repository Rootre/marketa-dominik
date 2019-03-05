import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminContent from '../components/admin/AdminContent';
import AdminLogin from '../components/admin/AdminLogin';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import UserPrototype from 'Prototypes/User';

import '../static/sass/global.scss';

setGlobal({
    fetching: new Map(),
    isLogged: false,
    notifications: new Map(),
});

function Admin() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');


    useEffect(() => {
        const admin = new UserPrototype('admin');

        setIsLogged(admin.isLogged());
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

Admin.getInitialProps = ({req, res: {activeRepertoire, songs}}) => {
    return {
        activeRepertoire,
        songs,
    };
};

export default Admin;