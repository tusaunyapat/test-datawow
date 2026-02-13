import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Concerts } from './entities/concert.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concerts)
    private readonly concertRepository: Repository<Concerts>,
  ) {}

  async create(createConcertDto: CreateConcertDto): Promise<Concerts> {
    const newConcert = this.concertRepository.create(createConcertDto);
    return await this.concertRepository.save(newConcert);
  }

  async findAll(): Promise<Concerts[]> {
    return await this.concertRepository.find();
  }

  async findOne(id: number): Promise<Concerts> {
    const concert = await this.concertRepository.findOneBy({ id });
    if (!concert) {
      throw new NotFoundException(`Concert #${id} not found`);
    }
    return concert;
  }

  async update(id: number, updateConcertDto: UpdateConcertDto): Promise<Concerts> {
    const concert = await this.findOne(id);
    const updated = Object.assign(concert, updateConcertDto);
    return await this.concertRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const concert = await this.findOne(id);
    await this.concertRepository.remove(concert);
  }
}
