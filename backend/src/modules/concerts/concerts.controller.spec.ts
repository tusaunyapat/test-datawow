import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

describe('ConcertsController', () => {
  let controller: ConcertsController;
  let service: ConcertsService;

  const mockConcertsService = {
    create: jest.fn((dto) => ({
      id: 'uuid-123',
      ...dto,
    })),
    findAll: jest.fn(() => [
      { id: 'uuid-1', name: 'Concert 1' },
      { id: 'uuid-2', name: 'Concert 2' },
    ]),
    findOne: jest.fn((id: string) => ({
      id,
      name: 'Single Concert',
    })),
    update: jest.fn((id: string, dto: UpdateConcertDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,
          useValue: mockConcertsService,
        },
      ],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
    service = module.get<ConcertsService>(ConcertsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call service.create with correct data', async () => {
      const dto: CreateConcertDto = { name: 'New Year Rock', totalSeats: 500 };
      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 'uuid-123', ...dto });
    });
  });

  describe('findAll()', () => {
    it('should return an array of concerts', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].name).toEqual('Concert 1');
    });
  });

  describe('findOne()', () => {
    it('should return a single concert by id', async () => {
      const id = 'uuid-abc';
      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result.id).toEqual(id);
    });
  });

  describe('update()', () => {
    it('should call service.update with id and dto', async () => {
      const id = 'uuid-abc';
      const dto: UpdateConcertDto = { name: 'Updated Concert Name' };
      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result.name).toEqual('Updated Concert Name');
    });
  });

  describe('remove()', () => {
    it('should call service.remove with correct id', async () => {
      const id = 'uuid-delete';
      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});