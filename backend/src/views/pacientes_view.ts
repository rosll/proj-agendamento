import Pacientes from '../models/Pacientes'

export default {
  render(paciente: Pacientes) {
    return {
      id: paciente.id,
      nome_paciente: paciente.nome_paciente,
      email: paciente.email,
      telefone: paciente.telefone,
      path: `http://localhost:3838/uploads/${paciente.path}`,
      created_at: paciente.created_at,
      updated_at: paciente.updated_at,
    }
  },

  renderMany(pacientes: Pacientes[]) {
    return pacientes.map(paciente => this.render(paciente))
  }
}