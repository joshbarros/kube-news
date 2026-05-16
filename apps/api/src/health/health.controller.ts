import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import * as os from 'os';

@ApiTags('health')
@Controller({ version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly prisma: PrismaClient) {}

  /** Liveness — is the process alive? */
  @Get('health')
  @ApiOperation({ summary: 'Liveness probe' })
  health() {
    return { state: 'up', machine: os.hostname() };
  }

  /** Readiness — can we serve traffic? (checks DB connectivity) */
  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe' })
  async ready() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { state: 'ready' };
  }
}
