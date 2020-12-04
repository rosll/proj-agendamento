import Medicos from '../models/Medicos'

export default {
  render(medico: Medicos) {
    return { 
      id: medico.id,
      nome: medico.nome,
      especialidade: medico.especialidade,
      created_at: medico.created_at,
      updated_at: medico.updated_at
    }
  },

  renderMany(medicos: Medicos[]) {
    return medicos.map(medico => this.render(medico))
  }
}