module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://0.0.0.0:27017/stayin",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
