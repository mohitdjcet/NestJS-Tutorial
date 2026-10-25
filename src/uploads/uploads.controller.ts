import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('uploads')
export class UploadsController {
    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('files',5,{
            storage: diskStorage({
                destination:"./uploads",
                filename:(req,file,callback)=>{
                    const uniqueName = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
                    callback(null,uniqueName);
                }
            }),
            limits:{
                fileSize:2*1024*1024,
                files:5,
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
    // async uploadSingleFile(
    //       @UploadedFile(
    //         new ParseFilePipe({
    //             fileIsRequired:true,
    //             validators:[
    //                 new MaxFileSizeValidator({
    //                     maxSize:2*1024*1024,
    //                 })
    //             ]
    //         })
    //     )
    //     file:Express.Multer.File
    // ){
    //     return{
    //         message:'File Upload Successfully',
    //         file:{
    //             filename:file.filename,
    //             originalName:file.originalname,
    //             size:file.size,
    //             mimeType:file.mimetype,
    //             path:file.path
    //         }
    //     }
    // }
    async uploadMulipleFiles(
        @UploadedFiles() files:Express.Multer.File[],
    ){
        if(!files || files.length === 0){
            throw new BadRequestException("Please upload at least one File")
        }
        return{
            message: 'File uploaded Successfully',
            totalFiles: files.length,
            files: files.map((file)=>({
                filename:file.filename,
                originalName:file.originalname,
                size:file.size,
                mimeType:file.mimetype,
                path:file.path                
            }))
        }
    }
}
