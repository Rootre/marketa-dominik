import React from 'react';
import Head from 'next/head';

import 'Sass/global.scss';

function Index() {
    return (
        <div>
            <Head>
                <title>{`Sing along!`}</title>
            </Head>
            <h1>Marketa &amp; Dominik</h1>
        </div>
    );
}

export default Index;