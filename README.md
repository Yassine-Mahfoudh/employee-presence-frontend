# Employee Presence – Frontend

Frontend de l'application web de planification de la présence des employés, développée durant mon stage chez **ST2i** (février – juillet 2022). Cette application permet aux administrateurs, RH et employés de gérer efficacement les plannings de présence, les demandes et les événements liés au lieu de travail.

##  Objectifs
- Faciliter la gestion des jours en télétravail, congés et présentiel
- Offrir une interface personnalisée selon le rôle de l’utilisateur (employé, supérieur, RH, admin)
- Centraliser les demandes, événements, et statistiques de présence

---

##  Interfaces principales

-  Interface d’authentification
  Formulaire de connexion sécurisé avec gestion de sessions.
  
![image](https://github.com/user-attachments/assets/acf6b177-86b7-4dbf-a162-1c3da596902f)

-  Page d’accueil administrateur (dashboard)
  Accès aux modules de gestion : utilisateurs, projets, départements, etc.

![image](https://github.com/user-attachments/assets/f6a283c4-0608-4b12-aeee-771c669f3d07)


-  Validation des demandes (supérieur hiérarchique)
  Interface dédiée à la consultation et validation des demandes d’absence ou de télétravail.
  
![image](https://github.com/user-attachments/assets/f2590c44-34d7-467e-bc1d-ce010c8bf229)

-  Calendrier RH
  Vue calendrier regroupant les présences, congés et télétravail des employés.

![image](https://github.com/user-attachments/assets/19a46bed-c097-48c0-8b92-7ee7ebc9a6d2)

-  Ajout d’événement (Responsable RH)
  Formulaire pour créer ou modifier des événements de planning (présentiel, congé, etc.)

![image](https://github.com/user-attachments/assets/1736cf02-b637-4e41-a2f8-430669bc7a98)

---

##  Stack technique
- **Angular** (front-end principal)
- **TypeScript**
- **HTML/CSS**
- **API REST** pour la communication avec le back-end Spring Boot

---

##  Lancer le projet localement

```bash
git clone https://github.com/ton-utilisateur/employee-presence-frontend
cd employee-presence-frontend
npm install
ng serve
```

## Auteur
Yassine Mahfoudh
