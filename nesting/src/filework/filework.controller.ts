import {
    Body,
    Controller,
    Delete,
    Get, Param,
    Post, Put,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {FileWorkDTO} from "./dto/create_file_work_dto";
import {FileWorkService} from "./filework.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileWork} from "./filework.model";
import {UpdateFileWorkDTO} from "./dto/update_file_work_dto";
import {Block} from "../block/block.model";


//Этот контроллер для работы с таблицей images.
@ApiTags('Изображения')
@Controller('images') //эндпоинт для запросов
export class FileWorkController {

    constructor(private fileWorkService: FileWorkService) {} //прокидываем FileWorkService
    // для работы с обработчиками модели FileWork

    // Подключаем декораторы для работы визуализации API(@ApiOperation, @ApiResponse) и так для каждого метода.


    // Подключаем декоратор @Post для того, чтобы в запросах работать с методом POST
    // декоратор @Body для того, чтобы вычленять непосредственно тело запроса
    // декораторы @UseInterceptors и @UploadedFiles() дают возможность работать с массивами файлов
    // Метод создаёт экземпляры таблицы images
    @ApiOperation({summary: 'Запись изображений в БД'})
    @ApiResponse({status: 200, type: FileWork})
    @Post()
    @UseInterceptors(FilesInterceptor('image'))
    create(@UploadedFiles() images, @Body() dto: FileWorkDTO) {
        return this.fileWorkService.createFileWork(images, dto);
    }

    // Подключаем декоратор @Get для того, чтобы в запросах работать с методом GET
    // Метод получает все экземпляры таблицы images, которые были созданы более 1 часа
    @ApiOperation({summary: 'Получение изображений, которые были занесены в БД больше часа назад'})
    @ApiResponse({status: 200, type: [FileWork]})
    @Get('/extra')
    getOutOfTime(){
        return this.fileWorkService.getOutOfTimeImages();
    }

    // Подключаем декоратор @Get для того, чтобы в запросах работать с методом GET
    // Метод получает все экземпляры таблицы images, которые не имеют essenceTable или essenceId
    @ApiOperation({summary: 'Получение изображений, которые были занесены в БД без уточнения таблицы' +
            ' и id экземпляра этой таблицы'})
    @ApiResponse({status: 200, type: [FileWork]})
    @Get('/unused')
    getUnused(){
        return this.fileWorkService.getUnusedImages();
    }

    // Подключаем декоратор @Get для того, чтобы в запросах работать с методом GET
    // Метод получает все экземпляры таблицы images, которые не имеют essenceTable
    // или essenceId или которые были созданы более 1 часа
    @ApiOperation({summary: 'Получение изображений, которые были занесены в БД больше часа назад,' +
            ' а также без уточнения таблицы и id экземпляра этой таблицы'})
    @ApiResponse({status: 200, type: [FileWork]})
    @Get('/all/trash')
    getAllTrash(){
        return this.fileWorkService.getAllTrashImages();
    }

    // Подключаем декоратор @Delete для того, чтобы в запросах работать с методом Delete
    // Метод удаляет все экземпляры таблицы images, которые не имеют essenceTable
    // или essenceId или которые были созданы более 1 часа
    @ApiOperation({summary: 'Удаление изображений, которые были занесены в БД больше часа назад,' +
            ' а также без уточнения таблицы и id экземпляра этой таблицы'})
    @ApiResponse({status: 200, type: [FileWork]})
    @Delete('/delete/all/trash')
    deleteAllTrash() {
        return this.fileWorkService.deleteAllTrashImages();
    }

    // Подключаем декоратор @Delete для того, чтобы в запросах работать с методом Delete
    // Метод удаляет экземпляр таблицы images по id
    @ApiOperation({summary: 'Удаление изображения'})
    @ApiResponse({status: 200, type: FileWork})
    @Delete()
    deleteFile(@Body() image_id: any) {
        return this.fileWorkService.deleteImageById(image_id.id);
    }

    // Подключаем декоратор @Delete для того, чтобы в запросах работать с методом DELETE.
    // Удаляет экземпляр таблицы images по id, только id предаётся в URL
    @ApiOperation({summary: 'Удаление блока по id'})
    @ApiResponse({status: 200, type: Block})
    @Delete('/:image_id')
    deleteBlockThroughUrlParams(@Param('image_id') image_id: any) {
        return this.fileWorkService.deleteImageById(+image_id);
    }

    // Подключаем декоратор @Put для того, чтобы в запросах работать с методом PUT.
    // Декоратор @Body для того, чтобы вычленять непосредственно тело запроса.
    // Изменяет экземпляр таблицы images по id
    @ApiOperation({summary: 'Изменение экземпляра таблицы images'})
    @ApiResponse({status: 200})
    @Put()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('image'))
    update(@Body() dto: UpdateFileWorkDTO, @UploadedFiles() image: any) {
        return this.fileWorkService.updateFileWork(dto, image);
    }
}
