/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const globalPrefix = "api";
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      })
    );

    console.log("process port", process.env.PORT);
    const port = Number(process.env.PORT) | 3000;
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("PORT:", process.env.PORT);
    if (!port) {
      throw new Error(
        "❌ process.env.PORT is undefined – required in production (e.g., Render)"
      );
    }
    await app.listen(port, "0.0.0.0");

    console.log(`started listening on http://0.0.0.0:${port}/${globalPrefix}`);
    Logger.log(
      `🚀 Application is running on: http://0.0.0.0:${port}/${globalPrefix}`
    );
  } catch (error) {
    console.error("❌ Error during app bootstrap:", error);
  }
}

bootstrap();
