import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  //other modules that this module depends on
  imports: [TypeOrmModule.forFeature([Category])],
  //classes that can be injected 
  providers: [CategoriesService],
  //classes decoratedd with @Contoller that handle HTTP
  controllers: [CategoriesController],
  //modules from this module that are avaiable to other modules
  //If another module imports CategoriesModule, they also get access to the Category repository provided by TypeOrmModule.forFeature([Category])
  exports:[TypeOrmModule]
})
export class CategoriesModule {}
