const express = require('express');
const app = express();
const PORT = 3000;

app.use(require('cors')());
app.use(express.json());

// Mock database
let users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    createdAt: "2024-01-15T10:00:00.000Z"
  }
];
let nextUserId = 2;

// ===== AUTHENTICATION =====
app.post('/auth/login', (req, res) => {
  console.log('✅ Login called:', req.body);
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    access_token: 'test_token_123',
    refresh_token: 'test_refresh_456',
    expires_in: 3600
  });
});

// ===== USERS =====
app.post('/users', (req, res) => {
  console.log('✅ Create user called:', req.body);
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const newUser = {
    id: nextUserId++,
    name,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);

  const { password: _, ...userResponse } = newUser;
  res.status(201).json(userResponse);
});

app.get('/users', (req, res) => {
  console.log('✅ Get all users called');
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  res.json({
    data: usersWithoutPassword,
    total: users.length,
    page: 1,
    limit: 10
  });
});

app.get('/users/:id', (req, res) => {
  console.log('✅ Get user by ID:', req.params.id);
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.put('/users/:id', (req, res) => {
  console.log('✅ Update user:', req.params.id, req.body);
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  const { password, ...userResponse } = users[userIndex];
  res.json(userResponse);
});

app.delete('/users/:id', (req, res) => {
  console.log('✅ Delete user:', req.params.id);
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server with users endpoint is working!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   POST /auth/login`);
  console.log(`   POST /users`);
  console.log(`   GET  /users`);
  console.log(`   GET  /users/:id`);
  console.log(`   PUT  /users/:id`);
  console.log(`   DELETE /users/:id`);
});