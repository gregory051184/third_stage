import {forwardRef, Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

// Декратор @Module используется для работы с контроллерами и сервисами
@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [
        SequelizeModule.forFeature([Profile]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule),
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        ProfileService,
    ]
})
export class ProfileModule {
}
