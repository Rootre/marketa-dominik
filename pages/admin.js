import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {setGlobal, useGlobal} from 'reactn';

import AdminLogin from '../components/AdminLogin';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import '../static/sass/global.scss';

setGlobal({
    isLogged: false,
    notifications: new Map(),
});

function Admin() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogged, setIsLogged] = useGlobal('isLogged');
    const [notifications] = useGlobal('notifications');


    useEffect(() => {
        //TODO: think of a way to set token from server to false after using it here
        // set user log with setIsLogged(boolean);
        setIsLoaded(true);
    }, []);

    return (
        <div>
            <Head>
                <title>{`Svatba Markéty a Dominika | admin sekce`}</title>
            </Head>


            <Notification notifications={notifications}/>
            {isLoaded ? isLogged ? (
                <div>tajná sekce!</div>
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