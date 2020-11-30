import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Agendamentos from '../models/Agendamentos'

export default {
  async create(req: Request, res: Response) {
    const {
      data_consulta,
      id_paciente,
      id_medico,
      hr_consulta
    } = req.body

    const agendamentosRepo = getRepository(Agendamentos)

    const dados = {
      data_consulta,
      id_paciente,
      id_medico,
      hr_consulta
    }

    const agendamento = agendamentosRepo.create(dados)
    await agendamentosRepo.save(agendamento)
    return res.status(201).json(agendamento)
  },

  async index(req: Request, res: Response) {
    const agendamentosRepo = getRepository(Agendamentos)
    const agendamento = await agendamentosRepo.find()
    return res.json(agendamento)
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const agendamentosRepo = getRepository(Agendamentos)
    const agendamento = await agendamentosRepo.findOne(id)
    return res.json(agendamento)
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const agendamentosRepo = getRepository(Agendamentos)
    await agendamentosRepo.delete(id)
    return res.json('Cadastro Excluído')
  }
}