import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getIoddData() {
    return await this.sensorService.getIoddFromPython();
  }

  @Post()
  async initSensor() {
    return await this.sensorService.initSensor();
  }

  @Patch(':index/:subindex')
  async setValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
    @Body() body: { value: number },
  ) {
    return await this.sensorService.writeValue(
      Number(index),
      Number(subindex),
      body.value,
    );
  }
}