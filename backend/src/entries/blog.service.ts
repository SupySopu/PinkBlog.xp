import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { BlogEntity } from './entities/blog.entity';
import { PaginationOptionsInterface } from "../pagination/pagination.options.interface";
import { Pagination } from 'src/pagination/pagination';
import { BlogModel } from './model/blog.model';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<BlogEntity>> {
    const limit = options.limit;
  
    // Contar todas las entradas en la base de datos
    const total = await this.blogRepository.count();
  
    // Obtener las entradas paginadas, usando skip y limit correctamente
    const [results] = await this.blogRepository.findAndCount({
      take: limit,
      skip: options.page * limit, // Asegúrate de que este cálculo sea correcto
    });
  
    return new Pagination<BlogEntity>({
      results,
      total,
    });
  }
  
  

  async create(blog: BlogModel): Promise<BlogEntity> {
    // No se usa más el slug
    return await this.blogRepository.save(this.blogRepository.create(blog));
  }

  async update(blog: BlogEntity): Promise<UpdateResult> {
    return await this.blogRepository.update(blog.id, blog);
  }

  async findById(id: number): Promise<BlogEntity | null> {
    return await this.blogRepository.findOneBy({id});
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.blogRepository.delete(id);
  }
}
