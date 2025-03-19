import { Injectable } from '@nestjs/common';
import { test } from '@core';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + test;
  }
}
