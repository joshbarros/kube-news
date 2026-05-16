"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
let AuthService = class AuthService {
    prisma;
    config;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email is already registered');
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
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const matches = await bcrypt.compare(password, user.passwordHash);
        if (!matches)
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        // Always return success to avoid account enumeration
        if (!user)
            return { message: 'If this email exists, a reset link has been generated.' };
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
    async resetPassword(token, newPassword) {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const user = await this.prisma.user.findFirst({
            where: {
                resetTokenHash: tokenHash,
                resetTokenExpires: { gt: new Date() },
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Reset token is invalid or expired');
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
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            if (typeof decoded === 'object' &&
                decoded !== null &&
                'sub' in decoded &&
                'email' in decoded &&
                'name' in decoded) {
                const payload = decoded;
                if (typeof payload.sub === 'number' &&
                    typeof payload.email === 'string' &&
                    typeof payload.name === 'string') {
                    return { sub: payload.sub, email: payload.email, name: payload.name };
                }
            }
            throw new common_1.UnauthorizedException('Invalid token payload');
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    signToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });
    }
    get jwtSecret() {
        return this.config.get('JWT_SECRET') ?? 'dev-only-change-me';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient,
        config_1.ConfigService])
], AuthService);
