import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceController } from './absence.controller';
import { AbsenceService } from './absence.service';
import { AbsenceRepository } from './absence.repository';
import { AbsenceSchema } from './absence.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Absence', schema: AbsenceSchema}])],
    controllers: [AbsenceController],
    providers: [AbsenceService, AbsenceRepository]
})
export class AbsenceModule{}
