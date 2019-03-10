import Document, {Head, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                <meta charSet={`UTF-8`}/>
                <meta name={`viewport`} content={`initial-scale=1.0, width=device-width`}/>
                <link href="https://fonts.googleapis.com/css?family=Dancing+Script&amp;subset=latin-ext" rel="stylesheet"/>
                {/*}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @font-face {
                            font-family: 'janeausu';
                            font-weight: 400;
                            src: url('/static/fonts/janeausu-webfont.woff2') format('woff2'),
                            url('/static/fonts/janeausu-webfont.woff') format('woff');
                        }`
                }}/>
                {*/}
                <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico'/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}