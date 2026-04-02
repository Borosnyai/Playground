import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';

@Module({
  imports: [HttpModule],
  providers: [SensorService],
  controllers: [SensorController],
})
export class SensorModule {}
