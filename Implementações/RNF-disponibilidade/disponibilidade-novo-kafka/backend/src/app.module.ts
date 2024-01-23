/** nestjs */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

/** modules */
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    HealthModule,
    KafkaModule,
    /** runtime environment variables (e.g. OS shell exports) take precedence */
    // TODO : schema validation (see https://docs.nestjs.com/techniques/configuration#schema-validation)
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      // ignoreEnvFile: process.env.NODE_ENV === "prod" ? true : false,
    }),
    /** see https://docs.nestjs.com/security/rate-limiting */
    ThrottlerModule.forRoot([{ ttl: 60, limit: 250 }]),
    /** see https://typeorm.io/data-source-options */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'felipe',
      password: '123456',
      database: 'db',
      autoLoadEntities: true,
      cache: { duration: 30000 },
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
