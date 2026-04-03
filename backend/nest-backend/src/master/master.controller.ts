import { Controller, Get } from '@nestjs/common';
import { MasterService } from './master.service';


@Controller('master')
export class MasterController {
    constructor(private readonly masterService: MasterService) {}

    @Get('config')
    Getconfig() {
        return this.masterService.getMasterConfig();
    }
}
