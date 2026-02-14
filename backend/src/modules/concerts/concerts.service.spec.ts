import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConcertsService } from './concerts.service';
import { Concerts } from './entities/concert.entity';
import { NotFoundException } from '@nestjs/common';

describe('ConcertsService', () => {
  let service: ConcertsService;
  let repository: Repository<Concerts>;

  const mockConcertRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: getRepositoryToken(Concerts),
          useValue: mockConcertRepository,
        },
      ],
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
    repository = module.get<Repository<Concerts>>(getRepositoryToken(Concerts));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new concert', async () => {
      const dto = { name: 'Rock Show', totalSeats: 100 };
      const savedConcert = { id: 'uuid-123', ...dto };

      mockConcertRepository.create.mockReturnValue(dto);
      mockConcertRepository.save.mockResolvedValue(savedConcert);

      const result = await service.create(dto as any);

      expect(mockConcertRepository.create).toHaveBeenCalledWith(dto);
      expect(mockConcertRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedConcert);
    });
  });

  describe('findAll', () => {
    it('should return an array of concerts', async () => {
      const expectedConcerts = [{ id: '1', name: 'Concert 1' }];
      mockConcertRepository.find.mockResolvedValue(expectedConcerts);

      const result = await service.findAll();

      expect(result).toEqual(expectedConcerts);
      expect(mockConcertRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a concert if found', async () => {
      const concert = { id: 'uuid-123', name: 'Jazz Night' };
      mockConcertRepository.findOneBy.mockResolvedValue(concert);

      const result = await service.findOne('uuid-123');

      expect(result).toEqual(concert);
    });

    it('should throw NotFoundException if concert not found', async () => {
      mockConcertRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('wrong-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the concert', async () => {
      const existingConcert = { id: '1', name: 'Old Name' };
      const updateDto = { name: 'New Name' };
      const updatedConcert = { ...existingConcert, ...updateDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingConcert as any);
      mockConcertRepository.save.mockResolvedValue(updatedConcert);

      const result = await service.update('1', updateDto as any);

      expect(result.name).toEqual('New Name');
      expect(mockConcertRepository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the concert if it exists', async () => {
      const concert = { id: '1', name: 'To Delete' };
      jest.spyOn(service, 'findOne').mockResolvedValue(concert as any);
      mockConcertRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockConcertRepository.remove).toHaveBeenCalledWith(concert);
    });
  });
});