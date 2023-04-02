import { Module } from '@nestjs/common';
import {BlockController, BlockControllerWithImages} from './block.controller';
import { BlockService } from './block.service';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Block} from "./block.model";
import {BlockGroup} from "../blockgroup/blockgroup.model";
import {FileWorkModule} from "../filework/filework.module";
import {BlockImageService} from "./block.service";
import {FileWork} from "../filework/filework.model";

// Декратор @Module используется для работы с контроллерами и сервисами
@Module({
  controllers: [BlockController, BlockControllerWithImages],
  providers: [BlockService, BlockImageService],
  imports: [
      SequelizeModule.forFeature([Block, BlockGroup, FileWork]),
      FilesModule,
      FileWorkModule
  ]
})
export class BlockModule {}
