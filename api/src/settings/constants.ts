export const isProduction = process.env.NODE_ENV === 'production';

export const envFilePath = [
  '.env',
  '.env.development',
  '.env.development.local',
];

export const validEnvironments = [
  'development',
  'production',
  'test',
  'provision',
];

export const defaultEnvironment = 'development';

export const defaultPort = 3333;

export const jwtExpiresIn = '30 days';
