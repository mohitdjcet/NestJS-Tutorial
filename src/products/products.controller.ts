import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';

@Controller('products')
export class ProductsController {
        @Get(':id')
        getProduct(@Param('id') id:string){
            throw new NotFoundException(
                'User not Found'
            )
        }
}
