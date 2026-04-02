import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Sensor } from './types/iodd.types';

@Injectable()
export class SensorService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'http://127.0.0.1:8000';

  async getIoddFromPython(): Promise<Sensor[]> {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/iodd/Balluff-BOS21UUIRP30-20180207-IODD1.1.zip`,
      ),
    );
    return response.data;
  }

  async writeValue(index: number, subindex: number, value: number) {
    // here come later: 
    // - MQTT publish
    // OR
    // - IO-Link Master REST calling

    return {
      message: 'WRITE request received',
      index,
      subindex,
      value,
    };
  }

  async initSensor() {
    return {
      message: 'INIT sensor (POST) not implemented yet',
    };
  }
}