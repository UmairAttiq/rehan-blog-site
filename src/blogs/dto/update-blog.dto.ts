import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsString, MaxLength, IsNumber, Validate, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Status } from 'src/statuses/entities/status.entity';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @ApiProperty({ example: 'content upto 2000 words ' })
    @IsOptional()
    @IsString()
    @MaxLength(10000)
    body?: string;
  
    @ApiProperty({ example: 'title of blog' })
    @IsOptional()
    @IsString()
    @MaxLength(150)
    title?: string;
  
    @ApiProperty({ type: User })
    @IsOptional()
    @IsNumber()
    @Validate(IsExist, ['User', 'id'], {
      message: 'userNotExists',
    })
    auther?: User;

    @ApiProperty({ type: Status })
    @IsOptional()
    @Validate(IsExist, ['Status', 'id'], {
      message: 'statusNotExists',
    })
    status?: Status;
}
