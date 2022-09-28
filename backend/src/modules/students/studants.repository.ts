import { CreateStudents } from './interfaces/students';
import { BaseSqlInterface } from '../../providers/database/base/interfaces/base.sql.interface';

export class StudantsRepository {
  constructor(private readonly dao: BaseSqlInterface) {}

  async create(args: CreateStudents): Promise<string> {
    return this.dao.save(args);
  }
}
