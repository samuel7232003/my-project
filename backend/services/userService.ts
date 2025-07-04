import fs from 'fs';
import path from 'path';
import { User } from '../models/user';

const DATA_FILE = path.join(__dirname, '../../data/users.json');

function readUsers(): User[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export function getAllUsers(): User[] {
  return readUsers();
}

export function addUser(user: User): void {
  const users = readUsers();
  users.push(user);
  saveUsers(users);
} 