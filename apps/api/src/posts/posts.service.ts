import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { publishDate: 'desc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto });
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findOne(id); // throws 404 if not found
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id); // throws 404 if not found
    return this.prisma.post.delete({ where: { id } });
  }
}
