const isProduction = process.env.NODE_ENV === 'production';
const entryFolder = isProduction ? './dist' : './src';

module.exports = {
  type: 'postgres',
  port: 5432,
  url: process.env.DATABASE_URL,
  migrations: [entryFolder + '/settings/migrations/*.ts'],
  entities: [entryFolder + '/**/*.entities.ts'],
  cli: {
    migrationsDir: entryFolder + '/settings/migrations',
  },
  extra: isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null,
};
