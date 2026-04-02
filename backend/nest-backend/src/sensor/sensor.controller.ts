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
  @Get(':index/:subindex')
  getSensorValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
  ) {
    return this.sensorService.getSensorValue(Number(index), Number(subindex));
  }
}
