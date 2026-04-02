import { Controller, Get, Param } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  getSensorData() {
    return this.sensorService.getSensorData();
  }
  @Get(':index')
  getSensorByIndex(@Param('index') index: string) {
    return this.sensorService.getSensorByIndex(Number(index));
  } 
}


