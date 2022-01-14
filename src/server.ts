import express from 'express';
import { LocadoraController } from './controllers/locadora-controller';

const app = express();
app.use(express.json());
const locadoraController = new LocadoraController();
// rota para criar o pokemon
app.post('/locadora', async (req, res) =>
  locadoraController.createLocadora(req, res),
);
// rota do pokemon que busca pelo nome
app.get('/locadora/:nome', async (req, res) =>
  locadoraController.getLocadoraByName(req, res),
);
// aqui é rota do upadte dos pokemons
app.patch('/locadora/:id', (req, res) =>
  locadoraController.updateLocadora(req, res),
);
// aqui deleta os pokemons
app.delete('/locadora/:id', async (req, res) =>
  locadoraController.deleteLocadora(req, res),
);
// listar filmes
app.get('/locadora', async (req, res) => locadoraController.getAll(req, res));

app.listen(3000, () => {
  console.log('servidor inciado na porta 3000');
});
