import { request, Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'
import Pacientes from '../models/Pacientes'
import PacientesView from '../views/pacientes_view'

export default {
  async create(req: Request, res: Response) {
    const {
      nome_paciente,
      email,
      telefone
    } = req.body

    const pacientesRepo = getRepository(Pacientes)

    const Fotos = req.files as Express.Multer.File[]
    const foto = Fotos.map(ft => {
      return ft.filename 
    })

    const path = foto[0]

    const dados = {
      nome_paciente,
      email,
      telefone,
      path
    }

    const paciente = pacientesRepo.create(dados)
    await pacientesRepo.save(paciente)
    return res.status(201).json(paciente)
  },

  async index(req: Request, res: Response) {
    const pacientesRepo = getRepository(Pacientes)
    const paciente = await pacientesRepo.find()
    return res.json(PacientesView.renderMany(paciente))
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const pacientesRepo = getRepository(Pacientes)
    const paciente = await pacientesRepo.findOneOrFail(id)
    return res.json(PacientesView.render(paciente))
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const pacientesRepo = getRepository(Pacientes)
    await pacientesRepo.delete(id)
    return res.json('Cadastro Excluído!!')
  },

}