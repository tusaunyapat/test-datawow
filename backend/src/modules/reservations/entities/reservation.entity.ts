import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("reservations")
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar', nullable: false})
    action: string;

    @Column({type: 'uuid', nullable: false})
    cid: string;

    @CreateDateColumn()
    createdAt: Date;
}
