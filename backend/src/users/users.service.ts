import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from "src/pagination/pagination.options.interface"
import { Pagination} from 'src/pagination/pagination';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email:string){
    return this.userRepository.findOneBy({ email })
  }

  findOneByRol(rol: string){
    return this.userRepository.findOneBy({ rol })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // paginacion
  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<User>> {
    const [results, total] = await this.userRepository.findAndCount({
      take: options.limit,
      skip: options.page, // think this needs to be page * limit
    });

    // TODO add more tests for paginate

    return new Pagination<User>({
      results,
      total,
    });
  }
  
}
