# 🏋️‍♂️ Gym Management System

Sistema integral para la gestión de gimnasios. Permite a los administradores gestionar ejercicios, clientes y asignar rutinas personalizadas con videos explicativos.

## 🚀 Tecnologías

Este proyecto utiliza una arquitectura **Full Stack** moderna:

* **Backend:** Node.js, Express, PostgreSQL (Base de Datos).
* **Frontend Admin:** React, Vite, Tailwind CSS.
* **Seguridad:** JWT (JSON Web Tokens) y Bcrypt.
* **Cliente Móvil:** React Native (Próximamente).

## 📂 Estructura del Proyecto

* `/backend`: API RESTful que maneja la lógica de negocio y base de datos.
* `/admin-web`: Panel de control web para el dueño/entrenador.
* `/mobile-app`: Aplicación para que los clientes vean sus rutinas.

## 🛠️ Instalación y Configuración

### 1. Base de Datos
Asegúrate de tener PostgreSQL instalado y crea una base de datos llamada `gym_system_db`.

### 2. Backend
```bash
cd backend
npm install
# Crea un archivo .env basado en las variables de entorno necesarias (DB_USER, DB_PASSWORD, JWT_SECRET, etc.)
npm run dev

3. Frontend (Panel Admin)
Bash

cd admin-web
npm install
npm run dev

✨ Funcionalidades
[x] Autenticación de Usuarios (Login/Registro con roles).

[x] Gestión de Biblioteca de Ejercicios (CRUD).

[x] Asignación de Rutinas Personalizadas (Series, Reps, Notas).

[x] Panel Administrativo con Dashboard.

[ ] Visualización de rutinas en App Móvil (En desarrollo).

👤 Autor
Desarrollado por Wilfer. Estudiante de Ingeniería en Sistemas.