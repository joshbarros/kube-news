"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // ── CORS ──────────────────────────────────────────────────────────────────
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
    // ── Global prefix + versioning ────────────────────────────────────────────
    // health & ready are excluded so K8s probes can reach them at root level
    app.setGlobalPrefix('api', { exclude: ['health', 'ready'] });
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    // ── Validation ────────────────────────────────────────────────────────────
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // strip unknown fields
        forbidNonWhitelisted: true,
        transform: true, // auto-cast primitive types
    }));
    // ── Swagger / OpenAPI ─────────────────────────────────────────────────────
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Kube-News API')
        .setDescription('News portal REST API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 3001);
    console.log(`API running on http://localhost:${process.env.PORT ?? 3001}`);
    console.log(`Swagger docs at http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}
bootstrap();
