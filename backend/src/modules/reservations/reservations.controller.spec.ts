import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { BadRequestException } from '@nestjs/common';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  const mockReservationsService = {
    create: jest.fn(),
    cancel: jest.fn(),
    findAll: jest.fn(),
    findAllById: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: mockReservationsService,
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    it('should call service.create when action is "reserved"', async () => {
      const dto: CreateReservationDto = { action: 'reserved', cid: 'uuid', userId: 'user1' } as any;
      mockReservationsService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result.id).toEqual(1);
    });

    it('should call service.cancel when action is "cancel"', async () => {
      const dto: CreateReservationDto = { action: 'cancel', concertId: 'uuid', userId: 'user1' } as any;
      mockReservationsService.cancel.mockResolvedValue({ action: 'Cancelled' });

      const result = await controller.create(dto);

      expect(service.cancel).toHaveBeenCalledWith(dto);
      expect(result.action).toEqual('Cancelled');
    });

    it('should throw BadRequestException when action is invalid', async () => {
      const dto: CreateReservationDto = { action: 'invalid_action' } as any;

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
      expect(service.create).not.toHaveBeenCalled();
      expect(service.cancel).not.toHaveBeenCalled();
    });
  });

  describe('findAllById()', () => {
    it('should call service.findAllById with correct name', async () => {
      const name = 'DataWow';
      await controller.findAllById(name);
      expect(service.findAllById).toHaveBeenCalledWith(name);
    });
  });

  describe('findOne()', () => {
    it('should convert id to number and call service.findOne', async () => {
      const id = '123';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(123); 
    });
  });

  describe('remove()', () => {
    it('should convert id to number and call service.remove', async () => {
      const id = '456';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(456);
    });
  });
});