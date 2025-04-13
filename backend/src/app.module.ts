import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './entries/blog.module';
import { CommentsModule } from './comment/comments.module';
//import { CommentsModule } from './comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "db_crud",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BlogModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
