API Testing Project
Простой проект для тестирования API с помощью Postman и Node.js сервера.

📋 Быстрый старт
1. Установите Node.js
Скачайте с nodejs.org и установите LTS версию.

2. Запустите сервер
bash
# Перейдите в папку проекта
cd API_server_Testing

# Установите зависимости
npm install

# Запустите сервер
node server.js
✅ Сервер запущен! Должны увидеть:

text
🚀 Server running: http://localhost:3000
3. Настройте Postman
Скачайте Postman с postman.com

Импортируйте коллекцию:

File → Import → Выберите My-API-Testing-Collection.json

Настройте окружение:

В правом верхнем углу нажмите ⚙️

Выберите "Manage Environments"

Добавьте переменную: base_url = http://localhost:3000

4. Протестируйте API
