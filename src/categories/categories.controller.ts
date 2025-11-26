import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiNoContentResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('categories')
export class CategoriesController {
    //injects categoriesservices as readonly
    constructor(private readonly categoriesService: CategoriesService){}

    //lists all categories with their products
    @Get()
    @ApiOperation({summary:'List categories (with products)'})
    @ApiOkResponse({description:'List of categories returned'})
    findAll(){
        return this.categoriesService.findAll();
    }

    //gets a category with itds id and returns int with all its products in it
    @Get(':id')
    @ApiOperation({summary:'Get a category (with products)'})
    @ApiParam({name:'id', example:1})
    @ApiOkResponse({description:'Category returned'})
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.categoriesService.findOne(id);
    }

    //admin only create
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({summary: 'Create category (Admin only)'})
    @ApiCreatedResponse({description:'category created'})
    create(@Body() dto: CreateCategoryDto){
        return this.categoriesService.create(dto);
    }

    //admin only update
    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update category (Admin only)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiOkResponse({ description: 'Category updated' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto,){
        return this.categoriesService.update(id, dto);
    }

    //admin only delete
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete category (Admin only)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiNoContentResponse({ description: 'Category deleted' })
    remove(@Param('id', ParseIntPipe) id:number){
        return this.categoriesService.remove(id);
    }

}
