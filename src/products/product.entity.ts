import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Category} from 'src/categories/category.entity';


//marks class as a Database table
@Entity()
export class Product{
    //generates a primary key that autoincerments
    @PrimaryGeneratedColumn()
    id: number;

    //maps a class property to a DB column
    @Column()
    name: string;

    @Column()
    description: string;

    //price column with decimal type
    @Column('decimal')
    price: number;

    //creates a many-to-one relatonship(foreign key)
    //one category can have many product
    @ManyToOne(()=> Category, category => category.products)
    category: Category;

}