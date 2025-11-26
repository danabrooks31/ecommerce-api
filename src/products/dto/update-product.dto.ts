import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiExtraModels } from '@nestjs/swagger';

//partialtype makes all fields optional for updates
export class UpdateProductDto extends PartialType(CreateProductDto){}