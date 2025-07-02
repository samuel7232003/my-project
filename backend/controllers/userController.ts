import { Request, Response } from 'express';
import { getAllUsers, addUser } from '../services/userService';
import { User } from '../models/user';

export function getUsers(req: Request, res: Response) {
  const users = getAllUsers();
  res.json(users);
}

export function createUser(req: Request, res: Response) {
  const { name, role, username, password } = req.body;
  if (!name || !role || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const user: User = { name, role, username, password };
  addUser(user);
  res.status(201).json(user);
}

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const users = getAllUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  res.json({ name: user.name, role: user.role, username: user.username });
} 