import { Column, Entity, PrimaryGeneratedColumn,JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import Medicos from './Medicos'
import Pacientes from './Pacientes'

@Entity('agendamentos')
class Agendamentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data_consulta: string;

  @Column()
  id_paciente: string;

  @ManyToOne(() => Pacientes)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Pacientes;

  @Column()
  id_medico: string;

  @ManyToOne(() => Medicos)
  @JoinColumn({ name: 'id_medico' })
  medico: Medicos

  @Column()
  hr_consulta: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export default Agendamentos