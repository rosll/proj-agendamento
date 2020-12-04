import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Medicos from '../models/Medicos'
import MedicosView from '../views/medicos_view'

export default {
  async create(req: Request, res: Response) {
    const {
      nome,
      especialidade
    } = req.body

    const medicosRepo = getRepository(Medicos)

    const dados = {
      nome,
      especialidade
    }

    const medico = medicosRepo.create(dados)
    await medicosRepo.save(medico)
    return res.status(201).json(medico)

  },

  async index(req: Request, res: Response) {
    const medicosRepo = getRepository(Medicos);
    const medico = await medicosRepo.find();
    return res.json(MedicosView.renderMany(medico));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params
    const medicosRepo = getRepository(Medicos);
    const medico = await medicosRepo.findOneOrFail(id)
    return res.json(MedicosView.render(medico))
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const medicosRepo = getRepository(Medicos);
    await medicosRepo.delete(id)
    return res.json('Cadastro Excluído!!')
  }
}