import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, SerializeOptions } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Blogs')
@Controller({
  path: 'blogs',
  version: '1',
})
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @SerializeOptions({groups: ['me','admin']})
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @SerializeOptions({groups: ['me','admin']})
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.blogsService.findAll();
  }

  @SerializeOptions({groups: ['me','admin']})
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @SerializeOptions({groups: ['me','admin']})
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @SerializeOptions({groups: ['me','admin']})
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
