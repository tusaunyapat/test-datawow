import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { BadRequestException } from '@nestjs/common';
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    switch (createReservationDto.action) {
      case 'reserved':
        return await this.reservationsService.create(createReservationDto);

      case 'cancel':
        return await this.reservationsService.cancel(createReservationDto);

      default:
        throw new BadRequestException(
          `Invalid action: ${createReservationDto.action}. Expected "reserved" or "cancel".`
        );
    }
  }


  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':name/all')
  findAllById(@Param('name') name: string) {
    return this.reservationsService.findAllById(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
