import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
//import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  //imports will have all modules
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      logging: true,
      username: 'danabrooks',     
      password: 'danabrooks',     
      database: 'ecommerce',          
      autoLoadEntities: true,         
      synchronize: true,             
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    
  ],
  controllers:[AppController],
  providers: [AppService]
})
export class AppModule {}
