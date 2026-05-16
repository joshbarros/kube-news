import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';

interface JwtPayload {
  sub: number;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email is already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    const token = this.signToken({ sub: user.id, email: user.email, name: user.name });
    return { token, user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) throw new UnauthorizedException('Invalid credentials');

    const token = this.signToken({ sub: user.id, email: user.email, name: user.name });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Always return success to avoid account enumeration
    if (!user) return { message: 'If this email exists, a reset link has been generated.' };

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash: tokenHash,
        resetTokenExpires: new Date(Date.now() + 1000 * 60 * 15),
      },
    });

    return {
      message: 'If this email exists, a reset link has been generated.',
      resetToken: rawToken,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.prisma.user.findFirst({
      where: {
        resetTokenHash: tokenHash,
        resetTokenExpires: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Reset token is invalid or expired');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetTokenHash: null,
        resetTokenExpires: null,
      },
    });

    return { message: 'Password updated successfully' };
  }

  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);

      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'sub' in decoded &&
        'email' in decoded &&
        'name' in decoded
      ) {
        const payload = decoded as Record<string, unknown>;
        if (
          typeof payload.sub === 'number' &&
          typeof payload.email === 'string' &&
          typeof payload.name === 'string'
        ) {
          return { sub: payload.sub, email: payload.email, name: payload.name };
        }
      }

      throw new UnauthorizedException('Invalid token payload');
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private signToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });
  }

  private get jwtSecret(): string {
    return this.config.get<string>('JWT_SECRET') ?? 'dev-only-change-me';
  }
}
