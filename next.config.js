module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://0.0.0.0:27017/stayin",
    CLOUDINARY_CLOUD_NAME: "anshuman115cloud",
    CLOUDINARY_API_KEY: "846776146913695",
    CLOUDINARY_API_SECRET: "YNDWH9uwiKImD6spVJQuqz4FIqA",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
