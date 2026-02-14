import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {

    const { name } = createReservationDto;

    const reserveCount = await this.reservationRepository.count({
      where: { name, action: 'reserved' },
    });

    const cancelCount = await this.reservationRepository.count({
      where: { name, action: 'cancel' },
    });

    if (reserveCount > cancelCount) {
      throw new BadRequestException(
        `User ${name} already has an active reservation for this concert.`
      );
    }
    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async isReserved(name: string, cid: string): Promise<Reservation | null> {
    return await this.reservationRepository.findOne({
      where: { 
        name: name,
        cid: cid,
        action: 'reserved' 
      }
    });
  }

  async cancel(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { name, cid, action } = createReservationDto
    const isReserved = await this.isReserved(name, cid)
    console.log("is reserves", isReserved)
    
    if(!isReserved){
      throw new BadRequestException(
        `Cannot cancel: No reserved entry found for ${name} with CID ${cid}`,
      );
    }

    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async findAllById(name: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({
    where: { 
      name: name 
    },
    order: { 
      createdAt: 'DESC' 
    }
  });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationRepository.preload({
      id: id,
      ...updateReservationDto,
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation #${id} not found`);
    }
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }

  async getTotalValue(): Promise<number> {
    const result = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('SUM(reservation.value)', 'total')
      .getRawOne();
      
    return parseFloat(result.total) || 0;
  }
}
