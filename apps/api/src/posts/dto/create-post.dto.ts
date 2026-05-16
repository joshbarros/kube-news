import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Kubernetes on the Cloud', maxLength: 80 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  title!: string;

  @ApiProperty({ example: 'A brief intro to K8s in the cloud', maxLength: 160 })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(160)
  summary!: string;

  @ApiProperty({ example: 'Full article content here...', maxLength: 5000 })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(5000)
  content!: string;
}
