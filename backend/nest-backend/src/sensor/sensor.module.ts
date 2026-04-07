import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { HttpModule } from '@nestjs/axios';
import { SensorService } from './sensor.service';
import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [HttpModule],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}