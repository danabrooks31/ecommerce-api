import { Injectable, NotFoundException } from '@nestjs/common';//not found is an HTTP exceptions
import { InjectRepository } from '@nestjs/typeorm';//used to inject TYPEorm repository
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()//marks class as a provider that can be used for dependency injections
export class ProductsService {
    constructor(
        //injects the project repo to access DB methods
        @InjectRepository(Product)
        private productRepo: Repository<Product>,

        //injects the Category repository for forgien key lookups
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ) {}

    //returns all products including their related categories
    findAll(){
        return this.productRepo.find({relations:['category']});

    }
    //finds one product by ID in a specific category relation
    findOne(id: number){
        return this.productRepo.findOne({where: { id }, relations:['category'] });
    }
    
    //creates a new product with imput being a DTO w/ name description. price, and category id 
    async create(dto: CreateProductDto){
        //finds the category that a product belonds to 
        const category = await this.categoryRepo.findOneBy({id: dto.categoryId})
        if (!category) throw new NotFoundException('Category not found');
   
        //creates a new product object and copies all property from dto and copies that category
        const product = this.productRepo.create({ ...dto, category });
        //saves product to the database
        return this.productRepo.save(product);
    }

    async update(id: number, dto: UpdateProductDto){
        //finds the product to update
        const product=await this.findOne(id);
        //throws error if product is not found
        if(!product) throw new NotFoundException('Product not found');

        //if a new cateogry id is provided in the update find it and assign it to the product
        if(dto.categoryId){
            const category=await this.categoryRepo.findOneBy({ id: dto.categoryId });
            if (!category) throw new NotFoundException('Category not found');
            product.category = category;
        }
        //overwrite existing product fields
        Object.assign(product, dto);
        //save updated product to database
        return this.productRepo.save(product);


    }
    //finds the product by id and removes it to the db
    async delete(id: number){

        const product = await this.productRepo.findOne({ where: { id } });
        // If product not found, throw a 404 error
    if (!product) {
        throw new NotFoundException('Product not found');
    }

    // Remove the product from the database
    return this.productRepo.remove(product);
    }

}
