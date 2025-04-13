import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post(':blogId')
  async create(
    @Param('blogId') blogId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Request() request, // Agregar este parámetro para obtener la información del usuario
  ) {
    const userId = request.user.id; // Asumiendo que el ID del usuario se almacena aquí
    return await this.commentsService.create(blogId, createCommentDto, userId);
  }
}