import express from 'express';
import { PokemonController } from './controllers/pokemon-controller';

const app = express();
app.use(express.json());
const pokemonController = new PokemonController();
// rota para criar o pokemon
app.post('/pokemon', async (req, res) =>
  pokemonController.createPokemon(req, res),
);
// rota do pokemon que busca pelo nome
app.get('/pokemon/:nome', async (req, res) =>
  pokemonController.getPokemonByName(req, res),
);
// aqui é rota do upadte dos pokemons
app.patch('/pokemon/:id', (req, res) =>
  pokemonController.updatePokemon(req, res),
);
// aqui deleta os pokemons
app.delete('/pokemon/:id', async (req, res) =>
  pokemonController.deletePokemon(req, res),
);
// listar pokemons
app.get('/pokemon', async (req, res) => pokemonController.getAll(req, res));

app.listen(3000, () => {
  console.log('servidor inciado na porta 3000');
});
