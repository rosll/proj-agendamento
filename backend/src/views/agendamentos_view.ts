import Agendamentos from '../models/Agendamentos'

export default {
  render(agendamento: Agendamentos) {
    return { 
      id: agendamento.id,
      data_consulta: agendamento.data_consulta,
      id_paciente: agendamento.id_paciente,
      id_medico: agendamento.id_medico,
      hr_consulta: agendamento.hr_consulta,
    }
  },

  renderMany(agendamentos: Agendamentos[]) {
    return agendamentos.map(agendamento => this.render(agendamento))
  }
 }