import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {File} from "./files.model";
import {AuthModule} from "../auth/auth.module";

// Декратор @Module используется для работы с контроллерами и сервисами
@Module({
  providers: [FilesService],
  exports: [
      FilesService
  ],
  controllers: [FilesController],
    imports: [
        SequelizeModule.forFeature([File]),
        forwardRef(() => AuthModule)
    ]
})
export class FilesModule {}
