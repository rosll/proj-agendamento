import { Router } from 'express'
import MedicosController from './controllers/MedicosController'
import PacientesController from './controllers/PacientesController'

const routes = Router()

routes.post('/medicos', MedicosController.create)
routes.get('/medicos', MedicosController.index)
routes.get('/medicos/:id', MedicosController.show)
routes.delete('/medicos/:id', MedicosController.remove)

routes.post('/pacientes', PacientesController.create)
routes.get('/pacientes', PacientesController.index)
routes.get('/pacientes/:id', PacientesController.show)
routes.delete('/pacientes/:id', PacientesController.remove)

export default routes