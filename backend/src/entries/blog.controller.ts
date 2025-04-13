import { Controller, Get, Put, Post, Param, Request, NotFoundException, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { BlogEntity } from './entities/blog.entity';
import { Pagination } from '../pagination/pagination'; // Importa tu clase de paginación
import { BlogService } from './blog.service';
import { BlogModel } from './model/blog.model';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from "../auth/guard/auth.guard";
import { RolesGuard } from "../auth/guard/role.guard"; // Importa el nuevo guard de roles

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async index(@Request() request): Promise<Pagination<BlogEntity>> {
  const limit = request.query.limit ? parseInt(request.query.limit, 10) : 8; // Limitar a 8 por defecto
  const page = request.query.page ? parseInt(request.query.page, 10) : 0; // Página actual

  const paginationOptions = {
    limit,
    page,
  };

  return await this.blogService.paginate(paginationOptions);
}
  

  // Obtener un blog específico basado en el id
  @Get('/:id')
  async show(@Param('id') id: number): Promise<BlogEntity> {
    const blog = await this.blogService.findById(id);
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  @UseGuards(RolesGuard) // Solo los administradores pueden crear entradas
  @Post()
  async create(
    @Body(new ValidationPipe()) body: BlogModel,
  ): Promise<BlogEntity> {
    return await this.blogService.create(body);
  }
  
  @UseGuards(AuthGuard) // Solo los administradores pueden actualizar entradas
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) body: BlogModel,
  ): Promise<UpdateResult> {
    const blog = await this.blogService.findById(id);
    if (!blog) {
      throw new NotFoundException();
    }
    return await this.blogService.update({
      ...blog,
      ...body,
    });
  }
}
