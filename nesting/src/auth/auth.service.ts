import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserDTO} from "../users/dto/create_user_dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    // Метод по авторизации пользователя, который возвращает jwt-token
    async login(dto: UserDTO) {
        const user = await this.validateUser(dto);
        return await this.generateToken(user);
    }

    // Метод, который записывает в token информацию о пользователе и возвращает этот token
    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    // Метод, который проверяет пароль пользователя и возвращает пользователя при совпадении паролей
    private async validateUser(dto: UserDTO) {
        const user = await this.usersService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
