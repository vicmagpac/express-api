import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  async store(req, res) {
    const msgError = 'Credenciais inválidas';
    const { email = '', senha = '' } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: [msgError],
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: [msgError],
      });
    }

    if (!(await user.passwordIsValid(senha))) {
      return res.status(401).json({
        errors: [msgError],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      token,
      user: {
        nome: user.nome,
        id,
        email,
      },
    });
  }
}

export default new AuthController();
