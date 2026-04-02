import { Controller, Get } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService ) {}

  @Get()
  getSensorData() {
    return this.sensorService.getSensorData();
  } 
}

