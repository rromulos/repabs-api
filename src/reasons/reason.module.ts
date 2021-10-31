import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReasonsController } from './reason.controller';
import { ReasonService } from './reason.service';
import { ReasonSchema } from './reason.model';
import { ReasonRepository } from './reason.repository';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Reason', schema: ReasonSchema}])],
    controllers: [ReasonsController],
    providers: [ReasonService, ReasonRepository]
})
export class ReasonModule {}