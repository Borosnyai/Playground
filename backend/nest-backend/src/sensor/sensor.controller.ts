import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async getIoddData() {
    return await this.sensorService.getIoddFromPython();
  }
  @Get('data')
  async getSensorData() {
    return await this.sensorService.getSensorData();
  }

  @Post()
  async initSensor() {
    return await this.sensorService.initSensor();
  }

  @Patch(':index/:subindex')
  async setValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
    @Body() body: UpdateSensorDto,
  ) {
    return await this.sensorService.writeValue(
      Number(index),
      Number(subindex),
      body.value,
    );
  }
}