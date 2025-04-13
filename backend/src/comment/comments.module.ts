import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { BlogEntity } from '../entries/entities/blog.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, BlogEntity, User]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}