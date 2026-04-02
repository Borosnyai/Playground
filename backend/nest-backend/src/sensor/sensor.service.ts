import { Injectable, NotFoundException } from '@nestjs/common';
import { mockSensorData } from './data/mock-sensor-data';

@Injectable()
export class SensorService {
  getSensorData() {
    return mockSensorData;
  }

  getSensorByIndex(index: number) {
    const sensor = mockSensorData.find((item) => item.index === index);

    if (!sensor) {
      throw new NotFoundException(`Sensor with index ${index} not found`);
    }

    return sensor;
  }

  getSensorValue(index: number, subindex: number) {
    const sensor = mockSensorData.find((item) => item.index === index);

    if (!sensor) {
      throw new NotFoundException(`Sensor with index ${index} not found`);
    }

    const value = sensor.values.find((item) => item.subindex === subindex);

    if (!value) {
      throw new NotFoundException(
        `Subindex ${subindex} not found for sensor index ${index}`,
      );
    }

    return {
      id: sensor.id,
      name: sensor.name,
      index: sensor.index,
      value,
    };
  }
}