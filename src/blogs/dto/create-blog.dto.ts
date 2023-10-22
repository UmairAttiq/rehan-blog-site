import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Validate, IsString, MaxLength, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { IsExist } from "src/utils/validators/is-exists.validator";

export class CreateBlogDto {
    @ApiProperty({ example: 'content upto 2000 words ' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(10000)
    body: string;
  
    @ApiProperty({ example: 'title of blog' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title: string;
  
    @ApiProperty({ type: User })
    @IsNotEmpty()
    @IsNumber()
    @Validate(IsExist, ['User', 'id'], {
      message: 'userNotExists',
    })
    auther: User;
  
}
