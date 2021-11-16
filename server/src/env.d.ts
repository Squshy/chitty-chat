declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_SECRET: string;
    DATABASE_URL: string;
    SENDGRID_API_KEY: string;
    MAIL_PASS: string;
    MAIL_USER: string;
  }
}