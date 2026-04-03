import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MasterService {
  constructor(private readonly configService: ConfigService, 
            private readonly htppService: HttpService) {}

  getMasterConfig() {
    const baseUrl = this.configService.get<string>('MASTER_BASE_URL');
    const apiPath = this.configService.get<string>('MASTER_API_PATH');

    console.log('MASTER_BASE_URL =', baseUrl);
    console.log('MASTER_API_PATH =', apiPath);

    return {
      baseUrl,
      apiPath,
      fullUrl: `${baseUrl}${apiPath}`,
    };
  }
}