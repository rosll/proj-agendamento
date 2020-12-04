import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Agendamentos from '../models/Agendamentos'
import Pacientes from '../models/Pacientes'
import Medicos from '../models/Medicos'
import AgendamentosView from '../views/agendamentos_view'
import PacientesView from '../views/pacientes_view'
import MedicosView from '../views/medicos_view'

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
    const agendamentoSearch = AgendamentosView.renderMany(await agendamentosRepo.find({
      select: ['id', 'hr_consulta', 'id_paciente', 'id_medico', 'data_consulta']
    }))

    const pacientesRepo = getRepository(Pacientes)
    const medicosRepo = getRepository(Medicos)

    let result: Array<object> = []

    for (let i in agendamentoSearch) {
      let paciente = PacientesView.render(await pacientesRepo.findOneOrFail(agendamentoSearch[i].id_paciente))
      let medico = MedicosView.render(await medicosRepo.findOneOrFail(agendamentoSearch[i].id_medico))
    
      result[i] = {
        id: agendamentoSearch[i].id,
        nome_paciente: paciente.nome_paciente,
        telefone: paciente.telefone,
        path: paciente.path,
        nome: medico.nome,
        especialidade: medico.especialidade,
        hr_consulta: agendamentoSearch[i].hr_consulta,
        data_consulta: agendamentoSearch[i].data_consulta
      }
    }

    return res.json(result)
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const agendamentosRepo = getRepository(Agendamentos)
    const agendamentoSearch = AgendamentosView.renderMany(await agendamentosRepo.find({ id }))

    const pacientesRepo = getRepository(Pacientes)
    const medicosRepo = getRepository(Medicos)

    let result: Array<object> = []

    for (let i in agendamentoSearch) {
      let paciente = PacientesView.render(await pacientesRepo.findOneOrFail(agendamentoSearch[i].id_paciente))
      let medico = MedicosView.render(await medicosRepo.findOneOrFail(agendamentoSearch[i].id_medico))
    
      result[i] = {
        id: agendamentoSearch[i].id,
        nome_paciente: paciente.nome_paciente,
        telefone: paciente.telefone,
        path: paciente.path,
        nome: medico.nome,
        especialidade: medico.especialidade,
        hr_consulta: agendamentoSearch[i].hr_consulta,
        data_consulta: agendamentoSearch[i].data_consulta
      }
    }

    return res.json(result)
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params
    const agendamentosRepo = getRepository(Agendamentos)
    await agendamentosRepo.delete(id)
    return res.json('Cadastro Excluído')
  }
}