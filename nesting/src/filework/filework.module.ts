import { Module } from '@nestjs/common';
import { FileWorkController } from './filework.controller';
import { FileWorkService } from './filework.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {FileWork} from "./filework.model";

// Декратор @Module используется для работы с контроллерами и сервисами
@Module({
  controllers: [FileWorkController],
  providers: [FileWorkService],
  imports: [
    SequelizeModule.forFeature([FileWork])
  ],
  exports: [
      FileWorkService
  ]
})
export class FileWorkModule {}
