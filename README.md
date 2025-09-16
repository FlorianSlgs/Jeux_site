# 🎯 Quiz Multijoueur Temps Réel

Application **Next.js** + **Express (Node.js)** pour jouer à des quiz multijoueur en direct via **Socket.IO**.
Stockage des données avec **MongoDB**.

---

## 🚀 Fonctionnalités

* Quiz multijoueur en temps réel
* Classements et scores sauvegardés dans MongoDB
* Interface moderne (Next.js)
* API + WebSocket gérés par Express & Socket.IO

---

## 📂 Structure

```
client/   → Frontend Next.js
server/   → Backend Express + Socket.IO + MongoDB
```

---

## 🛠️ Prérequis

* Node.js ≥ 18
* MongoDB (local ou Atlas)

---

## ⚙️ Installation & Lancement

```bash
git clone https://github.com/<user>/<projet>.git
cd <projet>

# Dépendances
npm install
cd client && npm install

# Développement
cd client && npm run dev     # Frontend : http://localhost:3000
cd server && npm run dev     # Backend : http://localhost:4000
```

---

## 🌐 Déploiement

* **Frontend** : Vercel, Render, ou serveur Node
* **Backend** : AWS, Render, etc.
* Configurer `MONGO_URI` et les autres variables d’environnement

---

## ⚡ Stack

* Next.js • React
* Express • Socket.IO
* MongoDB • Mongoose
* Node.js

---

## 📜 Licence

MIT
