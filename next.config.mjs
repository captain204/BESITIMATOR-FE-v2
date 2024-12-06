export default {
    async headers() {
      return [
        {
          source: "/(.*)", // Match all routes
          headers: [
            {
              key: "Content-Security-Policy",
              value: "default-src 'self' http: https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval';",
            },
            {
              key: "Strict-Transport-Security",
              value: "", // Disable HSTS to allow HTTP
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Allow all origins
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
