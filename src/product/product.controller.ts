import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Roles } from "../decorators";
import { RolesGuard } from "../guards";
import { IdValidationPipe } from "../pipes";
import { FindProductDto, ProductDto } from "./dto";
import { ProductService } from "./product.service";

@Roles("admin")
@UseGuards(RolesGuard)
@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async create(@Body() dto: ProductDto) {
    return await this.productService.create(dto);
  }

  @Get(":productId")
  async getProduct(@Param("productId", IdValidationPipe) productId: string) {
    return await this.productService.getProduct(productId);
  }

  @Delete(":productId")
  async deleteProduct(@Param("productId", IdValidationPipe) productId: string) {
    return await this.productService.deleteProduct(productId);
  }

  @Patch(":productId")
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param("productId", IdValidationPipe) productId: string,
    @Body() dto: ProductDto
  ) {
    return await this.productService.updateProduct(productId, dto);
  }

  @Post("find-product")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async findProduct(@Body() dto: FindProductDto) {
    return await this.productService.findProduct(dto);
  }
}
