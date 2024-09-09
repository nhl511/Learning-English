/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*{/}?", // Path pattern to match all routes
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no", // Disable buffering
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
