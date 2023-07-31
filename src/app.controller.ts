import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('postcode/:postcode')
  getFourSquareDataFromPostCode(
    @Param('postcode') postcode: string,
    @Res() res: Response,
  ) {
    return this.appService.getFourSquareDataFromPostCode(postcode, res);
  }
}
