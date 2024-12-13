import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import dataSource from '../../../ormconfig';

export class PopulateDemoUser1734112826895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.startTransaction();

    const password = await bcrypt.hash('secret', 10);

    // create master user
    const newUser = new User();
    newUser.username = 'demo';
    newUser.password = password;

    await dataSource.getRepository(User).save(newUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
    await queryRunner.startTransaction();

    await dataSource.getRepository(User).delete({ username: 'demo' });
  }
}
