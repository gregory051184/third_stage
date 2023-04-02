import {Module} from "@nestjs/common";
import {User} from "./src/users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./src/users/users.module";
import {ProfileModule} from "./src/profile/profile.module";
import {RolesModule} from "./src/roles/roles.module";
import {ConfigModule} from "@nestjs/config";
import {Profile} from "./src/profile/profile.model";
import {Role} from "./src/roles/roles.model";
import {UserRoles} from "./src/roles/userRoles.model";
import {AuthModule} from "./src/auth/auth.module";
import {Block} from "./src/block/block.model";
import {BlockModule} from "./src/block/block.module";
import {BlockGroupModule} from "./src/blockgroup/blockgroup.module";
import {BlockGroup} from "./src/blockgroup/blockgroup.model";
import {FilesModule} from "./src/files/files.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {FileWorkModule} from "./src/filework/filework.module";
import {FileWork} from "./src/filework/filework.model";
import {File} from "./src/files/files.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ConfigModule.forRoot({
           envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Profile, Role, UserRoles, Block, BlockGroup, FileWork, File],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        ProfileModule,
        AuthModule,
        BlockModule,
        BlockGroupModule,
        FilesModule,
        FileWorkModule,
    ]
})
export class AppModule{}