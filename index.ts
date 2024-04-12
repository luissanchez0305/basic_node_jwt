import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import axios from 'axios';
require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.json());

const secretKey = process.env.SECRET_KEY || 'secret_key';

// Middleware para verificar el token JWT
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded?.userId;
    next();
  });
};

// Ruta para autenticar al usuario y obtener el token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // TODO: Implementar verificacion de usuario con DB
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ userId: 1 }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Ruta protegida que requiere el token JWT
app.get('/posts', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta protegida que requiere el token JWT
app.get('/users', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
