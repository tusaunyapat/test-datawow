import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // เพิ่มการนำเข้า
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { Concerts } from './entities/concert.entity';
@Module({
  imports: [
    // --- จุดที่ต้องแก้: เพิ่มบรรทัดนี้ ---
    TypeOrmModule.forFeature([Concerts]), 
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}