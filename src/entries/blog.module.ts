import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { BlogService } from './blog.service';
import { ConfigModule } from 'nestjs-config'; // Solo si lo usas en otros lugares
import { BlogController } from './blog.controller';
//import { Comment } from 'src/comments/entities/comment.entity';
//import { CommentsModule } from 'src/comments/comment.module';

@Module({
  imports: [
    ConfigModule, // Usar forwardRef
    TypeOrmModule.forFeature([BlogEntity]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}