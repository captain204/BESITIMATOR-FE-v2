export default {
    async headers() {
      return [
        {
          source: "/(.*)", // Match all routes
          headers: [
            {
              key: "Content-Security-Policy",
              value: `default-src 'self' http: https: data: blob:; 
                      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
                      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                      font-src 'self' https://fonts.gstatic.com;`,
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains; preload", // Enable HSTS for 1 year (use cautiously)
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "https://yourdomain.com", // Allow only specific domains (use cautiously in production)
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
