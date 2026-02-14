import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: Repository<Reservation>;

  const mockReservationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create()', () => {
    const dto = { name: 'Alice', cid: 'concert-1', action: 'reserved' } as any;

    it('should throw BadRequestException if user already has an active reservation', async () => {
      
      mockReservationRepository.count
        .mockResolvedValueOnce(1) // reserveCount
        .mockResolvedValueOnce(0); // cancelCount

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create a reservation if no active reservation exists', async () => {
      mockReservationRepository.count
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(1);
      
      mockReservationRepository.create.mockReturnValue(dto);
      mockReservationRepository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(result.id).toBe(1);
      expect(mockReservationRepository.save).toHaveBeenCalled();
    });
  });

  describe('cancel()', () => {
    const dto = { name: 'Alice', cid: 'concert-1', action: 'cancel' } as any;

    it('should throw BadRequestException if no reserved entry is found', async () => {
      mockReservationRepository.findOne.mockResolvedValue(null);

      await expect(service.cancel(dto)).rejects.toThrow(BadRequestException);
    });

    it('should allow cancellation if a reservation exists', async () => {
      mockReservationRepository.findOne.mockResolvedValue({ id: 10, action: 'reserved' });
      mockReservationRepository.create.mockReturnValue(dto);
      mockReservationRepository.save.mockResolvedValue({ id: 11, ...dto });

      const result = await service.cancel(dto);

      expect(result.id).toBe(11);
      expect(mockReservationRepository.save).toHaveBeenCalled();
    });
  });

  describe('getTotalValue()', () => {
    it('should return the sum of values', async () => {
      const queryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ total: '150.50' }),
      };
      mockReservationRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.getTotalValue();

      expect(result).toBe(150.5);
    });

    it('should return 0 if total is null', async () => {
      const queryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ total: null }),
      };
      mockReservationRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      const result = await service.getTotalValue();
      expect(result).toBe(0);
    });
  });

  describe('findAll()', () => {
    it('should return all reservations', async () => {
      const expected = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      mockReservationRepository.find.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(result).toEqual(expected);
      expect(mockReservationRepository.find).toHaveBeenCalled();
    });
  });

  describe('findAllById()', () => {
    it('should return reservations for a specific name ordered by createdAt DESC', async () => {
      const name = 'Alice';
      mockReservationRepository.find.mockResolvedValue([{ name: 'Alice' }]);

      await service.findAllById(name);

      expect(mockReservationRepository.find).toHaveBeenCalledWith({
        where: { name },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne()', () => {
    it('should return a reservation if found', async () => {
      const reservation = { id: 1, name: 'Alice' };
      mockReservationRepository.findOneBy.mockResolvedValue(reservation);

      const result = await service.findOne(1);

      expect(result).toEqual(reservation);
      expect(mockReservationRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if not found', async () => {
      mockReservationRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should successfully update and save the reservation', async () => {
      const id = 1;
      const updateDto = { name: 'Updated Name' };
      const preloadedReservation = { id, ...updateDto };

      mockReservationRepository.preload.mockResolvedValue(preloadedReservation);
      mockReservationRepository.save.mockResolvedValue(preloadedReservation);

      const result = await service.update(id, updateDto);

      expect(mockReservationRepository.preload).toHaveBeenCalledWith({ id, ...updateDto });
      expect(mockReservationRepository.save).toHaveBeenCalledWith(preloadedReservation);
      expect(result).toEqual(preloadedReservation);
    });

    it('should throw NotFoundException if preload fails', async () => {
      mockReservationRepository.preload.mockResolvedValue(null);

      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should find and remove a reservation', async () => {
      const reservation = { id: 1, name: 'Alice' };
      mockReservationRepository.findOneBy.mockResolvedValue(reservation);
      mockReservationRepository.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(mockReservationRepository.remove).toHaveBeenCalledWith(reservation);
    });

    it('should throw NotFoundException if trying to remove non-existent id', async () => {
      mockReservationRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});