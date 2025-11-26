import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        //pulls in cat repo 
        @InjectRepository(Category)
        //stores it as a readonly class
        private readonly categoryRepo: Repository<Category>
    ){}

    //returns all categories from the database
    //also fethches the products in the cateogires
    findAll(){
        return this.categoryRepo.find({relations:['products']});
    }
    
    //looks up a single cat by id and also includes all the product relation
    async findOne(id:number){
        const cat=await this.categoryRepo.findOne({where: {id}, relations:['products']});
        if(!cat) throw new NotFoundException('Category not found');
        return cat;
    }

    //creates new dto
    async create(dto:CreateCategoryDto){
        //makes a new object in memory
        const cat =this.categoryRepo.create(dto);
        //saves that object to the db
        return this.categoryRepo.save(cat);
    }
    

    async update(id: number, dto: UpdateCategoryDto){
        //finds cat
        const cat=await this.findOne(id);
        //copies dto into cat object
        Object.assign(cat, dto);
        //saves db changes
        return this.categoryRepo.save(cat);
    }

    async remove(id: number){
        const cat=await this.findOne(id);
        return this.categoryRepo.remove(cat);
    }

}
