import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MasterService {
  constructor(private readonly configService: ConfigService) {}

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