import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import * as mqtt from 'mqtt';

@Injectable()
export class SensorService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient | null = null;
  private latestMqttData: any = null;

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('MQTT client connected');

      this.client?.subscribe('sensor1/data', (err) => {
        if (err) {
          console.error('MQTT subscribe error:', err);
          return;
        }

        console.log('Subscribed to sensor1/data');
      });
    });

    this.client.on('message', (topic, message) => {
      console.log('MQTT topic:', topic);
      console.log('MQTT raw message:', message.toString());

      try {
        const parsed = JSON.parse(message.toString());
        console.log('MQTT parsed message:', parsed);
        this.latestMqttData = parsed;
      } catch (error) {
        console.error('JSON parse error:', error);
        this.latestMqttData = {
          raw: message.toString(),
          topic,
        };
      }
    });

    this.client.on('error', (err) => {
      console.error('MQTT client error:', err);
    });
  }

  onModuleDestroy() {
    this.client?.end();
  }

  getLatestMqttData() {
    console.log('Returning latest MQTT data:', this.latestMqttData);
    return this.latestMqttData;
  }

  async getZipVariables() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://127.0.0.1:8000/variables'),
      );

      return response.data;
    } catch (error: any) {
      console.error('ZIP variables error:', error?.message);
      console.error('ZIP variables response:', error?.response?.data);

      return {
        message: 'Could not load variables from Python API',
        error: error?.message,
        details: error?.response?.data ?? null,
      };
    }
  }

  async getVariableValue(index: number, subindex: number) {
    const response = await firstValueFrom(
      this.httpService.get(
        `http://127.0.0.1:8000/variables/${index}/${subindex}`,
      ),
    );

    return response.data;
  }

  async writeValue(index: number, subindex: number, value: any) {
    console.log('WRITE:', index, subindex, value);

    return {
      success: true,
      message: 'Write request received',
      index,
      subindex,
      value,
    };
  }
}