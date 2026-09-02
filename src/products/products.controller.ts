import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';

@Controller('products')
export class ProductsController {
        @Get()
        getProduct(){
         return[
            {id:1, name:"Apple"},
            {id:2, name:"Mac"},
            {id:3, name:"Samsung"}
         ]
        }
}
