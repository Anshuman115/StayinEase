// require("dotenv").config();
module.exports = {
  env: {
    DB_LOCAL_URI: `${process.env.DB_LOCAL_URI}`,

    STRIPE_API_KEY: `${process.env.STRIPE_API_KEY}`,
    STRIPE_SECRET_KEY: `${process.env.STRIPE_SECRET_KEY}`,

    STRIPE_WEBHOOK_SECRET: `${process.env.STRIPE_WEBHOOK_SECRET}`,

    CLOUDINARY_CLOUD_NAME: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    CLOUDINARY_API_KEY: `${process.env.CLOUDINARY_API_KEY}`,
    CLOUDINARY_API_SECRET: `${process.env.CLOUDINARY_API_SECRET}`,

    SMTP_HOST: `${process.env.SMTP_HOST}`,
    SMTP_PORT: `${process.env.SMTP_PORT}`,
    SMTP_USER: `${process.env.SMTP_USER}`,
    SMTP_PASSWORD: `${process.env.SMTP_PASSWORD}`,
    SMTP_FROM_EMAIL: `${process.env.SMTP_FROM_EMAIL}`,
    SMTP_FROM_NAME: `${process.env.SMTP_FROM_NAME}`,

    SMTP_GMAIL_USER: `${process.env.SMTP_GMAIL_USER}`,
    SMTP_GMAIL_PASS: `${process.env.SMTP_GMAIL_PASS}`,
  },
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
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
