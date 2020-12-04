import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('pacientes')
class Pacientes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_paciente: string;

  @Column()
  email: string;

  @Column()
  telefone: number;

  @Column()
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pacientes