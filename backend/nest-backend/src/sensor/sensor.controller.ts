import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get('variables')
  async getVariables() {
    return this.sensorService.getZipVariables();
  }

  @Get('value/:index/:subindex')
  async getValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
  ) {
    return this.sensorService.getVariableValue(Number(index), Number(subindex));
  }

  @Patch('value/:index/:subindex')
  async writeValue(
    @Param('index') index: string,
    @Param('subindex') subindex: string,
    @Body() body: { value: any },
  ) {
    return this.sensorService.writeValue(
      Number(index),
      Number(subindex),
      body.value,
    );
  }

  @Get('latest')
  getLatest() {
    return this.sensorService.getLatestMqttData();
  }
}