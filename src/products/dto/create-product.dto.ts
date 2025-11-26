import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto{
    @ApiProperty({example: 'iPhone 15'})
    @IsNotEmpty()
    name: string;

    @ApiProperty({example:'128GB, Black'})
    @IsNotEmpty()
    description: string;

    @ApiProperty({example:999.99, type:Number})
    @IsNumber()
    price: number;

    @ApiProperty({example:1, description:'CategoryID'})
    @IsNumber()
    categoryId: number;

}
