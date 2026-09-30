import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository:Repository<Post>,

        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}

    async create(body:any){
        const user = await this.userRepository.findOne({
            where:{
                id: body.userId,
            }
        })

        if(!user){
            throw new NotFoundException("User not found")
        }

        const post = this.postRepository.create({
            title:body.title,
            content:body.content,
            user:user
        })
        return this.postRepository.save(post)
    }
}
