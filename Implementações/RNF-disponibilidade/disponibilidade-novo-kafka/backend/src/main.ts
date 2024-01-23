/** nestjs */
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe, INestApplication } from "@nestjs/common";

/** modules */
import { AppModule } from "./app.module";

/** external dependencies */
import helmet from "helmet";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
////////////////////////////////////////////////////////////////////////////////

/** bootstrap project */
(async function () {
  /** instantiate new project */
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  /** get config service */
  const configService = app.get(ConfigService);

  /** set global prefix */
  app.setGlobalPrefix("api/v1");

  /** generic middleware */
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  /** empty global validation pipe; configured at handler level */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false
    })
  );

  /** start server listener */
  await app.listen(configService.get("PORT")!);
  console.log(`Application is running on: ${await app.getUrl()}`);
})();
