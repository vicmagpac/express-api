import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Luis',
      email: 'aaa@mail.com',
      idade: 28,
    });

    res.json({
      novoAluno,
    });
  }
}

export default new HomeController();
