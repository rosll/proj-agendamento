import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Pacientes from '../models/Pacientes'

export default {
  async create(req: Request, res: Response) {
    const {
      nome_paciente,
      email,
      telefone
    } = req.body

    const pacientesRepo = getRepository(Pacientes)

    const dados = {
      nome_paciente,
      email,
      telefone
    }

    const paciente = pacientesRepo.create(dados)
    await pacientesRepo.save(paciente)
    return res.status(201).json(paciente)
  },

  async index(req: Request, res: Response) {
    const pacientesRepo = getRepository(Pacientes)
    const paciente = await pacientesRepo.find()
    return res.json(paciente)
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const pacientesRepo = getRepository(Pacientes)
    const paciente = await pacientesRepo.findOne(id)
    return res.json(paciente)
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const pacientesRepo = getRepository(Pacientes)
    await pacientesRepo.delete(id)
    return res.json('Cadastro Excluído!!')
  },

}