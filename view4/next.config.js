module.exports = {
    async redirects() {
        return [
            {
                source: '/s91p2000110h.jsp',
                destination: 'http://product.posco.com/homepage/product/kor/jsp/process/s91p2000110h.jsp',
                permanent: false
            },
            {
                source: '/s91p2000120h.jsp',
                destination: 'http://product.posco.com/homepage/product/kor/jsp/process/s91p2000120h.jsp',
                permanent: false
            },
            {
                source: '/s91p2000130h.jsp',
                destination: 'http://product.posco.com/homepage/product/kor/jsp/process/s91p2000130h.jsp',
                permanent: false
            },
            {
                source: '/s91p2000140h.jsp',
                destination: 'http://product.posco.com/homepage/product/kor/jsp/process/s91p2000140h.jsp',
                permanent: false
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })
        return config;
    },
    async rewrites() {
        if (process.env.NODE_ENV !== 'production' ) {
            return [
                {
                    source: '/:path*',
                    destination: 'http://192.168.0.251:9090/v2/:path*',
                }
            ]
        }
    }
}
