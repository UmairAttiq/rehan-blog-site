import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMetaDto } from './create-meta.dto';
import { IsNotEmpty, IsString, MaxLength, IsNumber, Validate, IsOptional } from 'class-validator';
import { Blog } from 'src/blogs/entities/blog.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdateMetaDto extends PartialType(CreateMetaDto) {
    @ApiProperty({ example: 'Meta title ' })
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    name?: string;
  
    @ApiProperty({ example: 'Meta tags' })
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(150)
    description?: string;

    @ApiProperty({ type: Blog })
    @IsNumber()
    @Validate(IsExist, ['Blog', 'id'], {
      message: 'blogNotExists',
    })
    blog: Blog;
}
