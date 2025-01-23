// Example for Products Service: packages/products/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug', 'verbose'] });
  app.useGlobalPipes(new ValidationPipe());

  // Middleware to allow introspection queries without authentication
  app.use((req, res, next) => {
    const introspectionQuery = req.body && req.body.query && req.body.query.includes('__schema');
    if (introspectionQuery) {
      return next();
    }
    // Apply authentication here for other queries
    // e.g., authenticate(req, res, next);
    next();
  });

  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(`🔸 Products Service is running on http://localhost:${port}/graphql`);
}
bootstrap();
