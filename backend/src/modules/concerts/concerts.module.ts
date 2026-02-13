import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { Concerts } from './entities/concert.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Concerts]), 
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}