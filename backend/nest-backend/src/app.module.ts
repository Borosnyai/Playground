import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SensorModule } from './sensor/sensor.module';
import { MasterModule } from './master/master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SensorModule,
    MasterModule,
  ],
})
export class AppModule {}