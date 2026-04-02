import { Controller, Get, Param } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getIoddData() {
    return await this.sensorService.getIoddFromPython();
  }

  @Get(':index')
  async getSensorByIndex(@Param('index') index: string) {
    return await this.sensorService.getSensorByIndex(Number(index));
  }

  @Get(':index/:subindex')
  async getSensorValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
  ) {
    return await this.sensorService.getSensorValue(
      Number(index),
      Number(subindex),
    );
  }
}