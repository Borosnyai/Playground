import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SensorService {
  constructor(private readonly httpService: HttpService) {}

  private readonly url =
    'http://127.0.0.1:8000/iodd/Balluff-BOS21UUIRP30-20180207-IODD1.1.zip';

  async getIoddFromPython() {
    const response = await firstValueFrom(this.httpService.get(this.url));
    return response.data;
  }

  async getSensorByIndex(index: number) {
    const data = await this.getIoddFromPython();

    const sensor = data.find((item: any) => item.index === index);

    if (!sensor) {
      throw new NotFoundException(`Sensor with index ${index} not found`);
    }

    return sensor;
  }

  async getSensorValue(index: number, subindex: number) {
    const sensor = await this.getSensorByIndex(index);

    const value = sensor.values.find((item: any) => item.subindex === subindex);

    if (!value) {
      throw new NotFoundException(
        `Subindex ${subindex} not found for sensor index ${index}`,
      );
    }

    return {
      index: sensor.index,
      name: sensor.name,
      value,
    };
  }
}