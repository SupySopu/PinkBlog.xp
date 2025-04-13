import { IsString, IsDate, IsOptional, MaxLength } from 'class-validator';

export class BlogModel {
  readonly id: number;

  @IsString()
  title: string;

  @IsString()
  @MaxLength(30)
  preview: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDate()
  publish_at?: Date;
}