export default {
    async headers() {
      return [
        {
          source: "/(.*)", // Match all routes
          headers: [
            {
              key: "Content-Security-Policy",
              value: "default-src 'self' http: https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=0; includeSubDomains; preload", // Properly disable HSTS with `max-age=0`
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Allow all origins (use cautiously in production)
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Proxy API requests
          destination: "http://13.60.208.160/:path*", // Your HTTP API endpoint
        },
      ];
    },
  };
  
  
  



// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
