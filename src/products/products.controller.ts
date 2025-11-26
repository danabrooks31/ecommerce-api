import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';//business logic
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';//uses jwt strategy to authenticate
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/users/user.entity';//enums of rules
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiQuery, ApiNoContentResponse} from '@nestjs/swagger';


//pagiontion-breaking larger sets into smaller pages
        //offset based
//search-filtering the results to only matched criteria

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    //inject product services as readonly
    constructor(private readonly productsService: ProductsService){}


    //return all products
    @Get()//return data from server
    @ApiOperation({summary: 'List products (supports search & pagination)'})
    @ApiQuery({name: 'page', required: false, example:1})
    @ApiQuery({name:'limit', required:false, example:10})
    @ApiQuery({name: 'search', required:false, example:'iphone'})
    @ApiOkResponse({description:'List of products returned'})
    findAll(@Query('page') page?: number, @Query('limit')limit?:number, @Query('search') search?:string){
        return this.productsService.findAll();
    }

    //GET/products/:i
    // //reads id from url using Param
    //runs through parseintpipe to change to integer and assigns to variable name ID

    @Get(':id')
    @ApiOperation({summary:'Get a product by ID'})
    @ApiParam({name:'id', example:1})
    @ApiOkResponse({description:'Product returned'})
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.productsService.findOne(id);
    }

    //POST/products
    @Post()//create new resource on server
    @ApiBearerAuth()
    //first must login
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    //role must be admin
    @Roles(UserRole.ADMIN)
    //body is valid type and calls service to create product 
    @ApiOperation({summary:'Create product(Admin only)'})
    @ApiCreatedResponse({description:'Product Created'})
    create(@Body() dto: CreateProductDto){
        return this.productsService.create(dto);
    }

    //PUT/products/:id
    @Put(':id')//update a resource on the server
    @ApiBearerAuth()
    //admin only
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    //parse id and validate body
    @ApiOperation({summary:'Update product (Admin Only)'})
    @ApiParam({name:'id', example: 1})
    @ApiOkResponse({description:'product update'})
    update(@Param('id', ParseIntPipe) id: number, @Body() dto:UpdateProductDto){
        return this.productsService.update(id, dto);
    }

    //DELETE/products/:id
    @Delete(':id')//remove a resource from the server
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({summary: 'Delete product(Admin only)'})
    @ApiParam({name: 'id', example:1})
    @ApiNoContentResponse({description: 'Product deleted'})
    remove(@Param('id', ParseIntPipe) id:number){
        return this.productsService.delete(id);
    }
}
