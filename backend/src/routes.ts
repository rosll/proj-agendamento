import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import MedicosController from './controllers/MedicosController'
import PacientesController from './controllers/PacientesController'
import AgendamentosController from './controllers/AgendamentosController'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/medicos', MedicosController.create)
routes.get('/medicos', MedicosController.index)
routes.get('/medicos/:id', MedicosController.show)
routes.delete('/medicos/:id', MedicosController.remove)

routes.post('/pacientes', upload.array('path'), PacientesController.create)
routes.get('/pacientes', PacientesController.index)
routes.get('/pacientes/:id', PacientesController.show)
routes.delete('/pacientes/:id', PacientesController.remove)

routes.post('/agendamentos', AgendamentosController.create)
routes.get('/agendamentos', AgendamentosController.index)
routes.get('/agendamentos/:id', AgendamentosController.show)
routes.delete('/agendamentos/:id', AgendamentosController.remove)



export default routes