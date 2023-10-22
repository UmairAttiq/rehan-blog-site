import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsNumber, Validate } from "class-validator";
import { Blog } from "src/blogs/entities/blog.entity";
import { IsExist } from "src/utils/validators/is-exists.validator";

export class CreateMetaDto {
    @ApiProperty({ example: 'Meta title ' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
  
    @ApiProperty({ example: 'Meta tags' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    description: string;

    @ApiProperty({ type: Blog })
    @IsNumber()
    @Validate(IsExist, ['Blog', 'id'], {
      message: 'blogNotExists',
    })
    blog: Blog;
}
