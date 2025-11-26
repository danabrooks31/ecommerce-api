import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Product} from 'src/products/product.entity';

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    //gives a Cateogry many products
    @OneToMany(()=> Product, (product)=>product.category)
    //the property of categorys that will hold the related product entities
    products:Product[];
}