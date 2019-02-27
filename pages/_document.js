import Document, {Head, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                <meta charSet={`UTF-8`}/>
                <meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
                <link href={'https://fonts.googleapis.com/css?family=Cedarville+Cursive'} rel={'stylesheet'}/>
                <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}