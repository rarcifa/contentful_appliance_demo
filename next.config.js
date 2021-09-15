module.exports = {
    image: {
        domains: ["images.ctfassets.net"]
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    env: {
        contentfulGraphQLUrl: `https://graphql.contentful.com/content/v1/spaces/3ksj4lze15ym?access_token=joCCV0vQKQkjyD6wpTgR9QJMPrJ7usKDGQOTKc7SFh4`,
        contentfulPreviewGraphQLUrl: `https://graphql.contentful.com/content/v1/spaces/3ksj4lze15ym?access_token=g60B7Yj5I5RS3J5xEzxY7hPxN-bYOMPMI7xqzWypE7Y`,
    },
    async headers() {
        return [
            { 
                source: '/:path*{/}?',
                headers: [
                {
                    key: 'Authentication',
                    value: '4XYMWcj6m2OhJRzzK-Fel3hqc981ey7i',
                },
                ],
            },
        ]
    },
};
