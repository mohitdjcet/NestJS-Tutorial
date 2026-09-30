import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService){}

    @Post()
    create(@Body() body:any){
        return this.postService.create(body)
    }
}
