import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto{
    @ApiProperty({example: 'Smartphone'})
    @IsNotEmpty()
    name:string;
}