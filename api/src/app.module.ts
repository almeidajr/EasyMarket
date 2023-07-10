import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NfcesModule } from './nfces/nfces.module';
import {
  defaultEnvironment,
  defaultPort,
  envFilePath,
  isProduction,
  validEnvironments,
} from './settings/constants';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: isProduction,
      envFilePath,
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...validEnvironments)
          .default(defaultEnvironment),
        PORT: Joi.number().default(defaultPort),
        USING_DOCKER_COMPOSE: Joi.boolean().default(false),
        APP_SECRET: Joi.string().required(),
        HASH_SALT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        SCRAPER_URL: Joi.string().uri().required(),
        WEB_APP_URL: Joi.string().uri().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        Object.assign(await getConnectionOptions(), {
          url: configService.get<boolean>('USING_DOCKER_COMPOSE')
            ? configService
                .get<string>('DATABASE_URL')
                .replace('localhost', 'database')
            : configService.get<string>('DATABASE_URL'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/settings/migrations/*{.ts,.js}'],
        }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ShoppingListsModule,
    NfcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
