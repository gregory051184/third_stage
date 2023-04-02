import {Module} from '@nestjs/common';
import {BlockGroupController} from './blockgroup.controller';
import {BlockGroupService} from './blockgroup.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {BlockGroup} from "./blockgroup.model";
import {Block} from "../block/block.model";

// Декоратор @Module используется для работы с контроллерами и сервисами
@Module({
    controllers: [BlockGroupController],
    providers: [BlockGroupService],
    imports: [
        SequelizeModule.forFeature([BlockGroup, Block])
    ]
})
export class BlockGroupModule {
}
