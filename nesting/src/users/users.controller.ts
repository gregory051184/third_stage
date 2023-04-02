import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserDTO} from "./dto/create_user_dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles_auth.decorator";
import {RolesGuard} from "../guards/roles_guard";
import {AddRoleDTO} from "./dto/add_role_dto";
import {Current_user_or_admin_guard} from "../guards/current_user_or_admin_guard";
import {UpdateUserDTO} from "./dto/update_user_dto";
import {Block} from "../block/block.model";


//Этот контроллер для работы с пользователями.
@ApiTags('Пользователи')
@Controller('users') //эндпоинт для запросов
export class UsersController {

    constructor(private userService: UsersService) {} //прокидываем UsersService
    // для работы с обработчиками модели User


    // Подключаем декораторы для работы визуализации API(@ApiOperation, @ApiResponse) и так для каждого метода.


    // Подключаем декоратор @Post для того, чтобы в запросах работать с методом POST
    // декоратор @Body для того, чтобы вычленять непосредственно тело запроса
    // Метод создаёт экземпляры таблиц users
    @ApiOperation({
        summary: 'Создание пользователя без регистрации профиля ' +
            '(желательно не использовать в отрыве от регистрации профиля)'
    })
    @ApiResponse({status: 200, type: User})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() dto: UserDTO) {
        return this.userService.createUser(dto)
    }

    // Подключаем декоратор @Get для того, чтобы в запросах работать с методом GET
    // Метод получает все экземпляры таблицы users
    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAll()
    }

    // Подключаем декоратор @Put для того, чтобы в запросах работать с методом PUT.
    // Декоратор @Body для того, чтобы вычленять непосредственно тело запроса.
    // Current_user_or_admin_guard проверяет, относится ли пользователь к этому профилю
    // или является ли пользователь администратором
    // Изменяет экземпляр таблицы users
    @ApiOperation({
        summary: 'Изменение пользователя (должен быть либо сам пользователь,' +
            ' либо роль администратора)'})
    @ApiResponse({status: 200})
    @UseGuards(Current_user_or_admin_guard)
    @Put()
    @UsePipes(ValidationPipe)
    update(@Body() dto: UpdateUserDTO) {
        return this.userService.updateUser(dto)
    }

    // Подключаем декоратор @Delete для того, чтобы в запросах работать с методом DELETE.
    // Current_user_or_admin_guard проверяет, относится ли пользователь к этому профилю
    // или является ли пользователь администратором
    // Удаляет экземпляр таблицы users по id
    @ApiOperation({summary: 'Удаление пользователя по id (должен быть либо сам пользователь,' +
            ' либо роль администратора). Связанный профайл тоже будет удалён'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(Current_user_or_admin_guard)
    @Delete()
    delete(@Body() user_id: any) {
        return this.userService.deleteUser(user_id.id)
    }

    // Подключаем декоратор @Delete для того, чтобы в запросах работать с методом DELETE.
    // Удаляет экземпляр таблицы users по id, только id предаётся в URL
    @ApiOperation({summary: 'Удаление блока по id'})
    @ApiResponse({status: 200, type: Block})
    @UseGuards(Current_user_or_admin_guard)
    @Delete('/:user_id')
    deleteBlockThroughUrlParams(@Param('user_id') user_id: any) {
        return this.userService.deleteUser(+user_id);
    }

    // Подключаем декоратор @Post для того, чтобы в запросах работать с методом POST
    // Подключаем декоратор @Roles добавляя в него
    // роль "ADMIN" и RolesGuard для проверки пользователя на статус администратора
    // декоратор @Body для того, чтобы вычленять непосредственно тело запроса
    // Метод добавляет роль пользователю
    @ApiOperation({summary: 'Добавление роли пользователю'})
    @ApiResponse({status: 200, type: AddRoleDTO})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    @UsePipes(ValidationPipe)
    addRole(@Body() dto: AddRoleDTO) {
        return this.userService.addRole(dto);
    }
}
