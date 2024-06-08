import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    {/* Google Tag Manager */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NYJ1D95MG7"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NYJ1D95MG7');
              `,
                        }}
                    />
                </Head>
                <body>
                {/* Kakao Maps SDK */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                var script = document.createElement('script');
                script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=' + '${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}' + '&libraries=services&autoload=false';
                document.body.appendChild(script);
              `,
                    }}
                />
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
