import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get('latest')
  getLatest() {
    return this.sensorService.getLatestMqttData();
  }

  @Get('variables')
  getVariables() {
    return this.sensorService.getZipVariables();
  }

  @Get('value/:index/:subindex')
  getValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
  ) {
    return this.sensorService.getVariableValue(Number(index), Number(subindex));
  }

  @Patch('value/:index/:subindex')
  writeValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
    @Body() body: { value: any },
  ) {
    return this.sensorService.writeVariableValue(
      Number(index),
      Number(subindex),
      body.value,
    );
  }
}