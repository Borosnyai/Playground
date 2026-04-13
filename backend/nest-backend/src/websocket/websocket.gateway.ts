import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  sendTestMessage() {
    this.server.emit('sensor-data', {
      id: 'sensor-1',
      name: 'BOS 21M-UUI-RP30-S4',
      value: true,
      timestamp: new Date().toISOString(),
    });
  }
}