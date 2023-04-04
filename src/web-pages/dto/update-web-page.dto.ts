import { PartialType } from '@nestjs/swagger';
import { CreateWebPageDto } from './create-web-page.dto';

export class UpdateWebPageDto extends PartialType(CreateWebPageDto) {}
