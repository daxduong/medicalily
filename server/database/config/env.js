// Database environment setup and connections
const env = {
    DATABASE_DIALECT: 'sqlite',
    DATABASE_STORAGE: './db.sqlite',
    WEB_URL: 'http://localhost:3000/',
    SECRET: 'honkers',
};

module.exports = env;

/**
const env = {
    DATABASE_DIALECT: 'postgres',
    DATABASE_HOST: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    DATABASE_PORT: '26257',
    DATABASE_NAME: 'postgres',
    DATABASE_USERNAME: 'cindy',
    DATABASE_PASSWORD: 'bMGsDsyvG_9Yyu8w',
    SECRET: 'honkers',
    WEB_URL: 'http://localhost:3000/'
};

module.exports = env;
 **/