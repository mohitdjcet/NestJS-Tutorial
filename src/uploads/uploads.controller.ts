import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('uploads')
export class UploadsController {
    @Post('single')
    @UseInterceptors(
        FileInterceptor('file',{
            storage: diskStorage({
                destination:"./uploads",
                filename:(req,file,callback)=>{
                    const uniqueName = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
                    callback(null,uniqueName);
                }
            }),
            limits:{
                fileSize:2*1024*1024,
            },
            fileFilter:(req,file,callback)=>{
                const allowedTypes= ['image/jpeg','image/png']
                if(!allowedTypes.includes(file.mimetype)){
                    return callback(
                        new BadRequestException("Only JPEG and PNG file are allowed"),
                        false
                    )
                }
                callback(null,true);
            }
        })
    )
    async uploadSingleFile(
          @UploadedFile(
            new ParseFilePipe({
                fileIsRequired:true,
                validators:[
                    new MaxFileSizeValidator({
                        maxSize:2*1024*1024,
                    })
                ]
            })
        )
        file:Express.Multer.File
    ){
        return{
            message:'File Upload Successfully',
            file:{
                filename:file.filename,
                originalName:file.originalname,
                size:file.size,
                mimeType:file.mimetype,
                path:file.path
            }
        }
    }
}
