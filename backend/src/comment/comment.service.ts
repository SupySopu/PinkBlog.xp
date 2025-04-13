import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogEntity } from '../entries/entities/blog.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(blogId: number, createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const blog = await this.blogRepository.findOneBy({ id: blogId });
    const user = await this.userRepository.findOneBy({ id: userId });

    const comment = this.commentRepository.create({
      ...createCommentDto,
      blog,
      user,
    });

    return await this.commentRepository.save(comment);
  }
}
