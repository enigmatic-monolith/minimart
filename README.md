# minimart

Prototype: [https://minimart.nknguyenhc.net](https://minimart.nknguyenhc.net)

## What it does

Minimart is a web-based voucher system that enables residents to streamline their process.

* Residents can track their task completion, earn voucher points, and request products.
* Admins can manage users, audit logs, and approve task activities.

## How we built it

The project is divided into three main components: frontend, backend, and database. The frontend is developed using React and MUI components, with Vite as the development server. The backend is built with ExpressJS and is Dockerized for easy deployment on Google Cloud Run. Supabase provides the PostgreSQL database for data persistence. The architecture is designed to ensure each component can be developed and deployed independently.

## Accomplishments that we're proud of

We are proud of successfully deploying a fully functional voucher & product system with a modern tech stack. The use of Docker and Google Cloud Run for the backend deployment was a significant achievement, as it allowed us to ensure scalability and reliability. The integration of Supabase for database management also streamlined our development process.

## What's next for Minimart

Moving forward, we plan to enhance Minimart by adding more features such as advanced search capabilities, personalized recommendations, and improved analytics. We also aim to optimize the platform for better performance and scalability, ensuring it can handle increased traffic and user demands.

## Overall architecture

![Architecture](./architecture.png)

Google Cloud DNS was used to host our domain and point the respective domains to our frontend and backend servers.

Our website architecture is split into 3 parts: frontend, backend, and database. Each of the parts is deployed separately.

### Frontend

React was chosen as framework due to its ease of development and familiarity. We made use of MUI components to quickly build our frontend. Vite was used as our development server and builder. Our frontend is deployed on Github Pages.

### Backend

Our backend is built with ExpressJS, a lightweight framework allowing us to only build features we need. Our backend is Dockerised and deployed on Google Cloud Run.

### Supabase

Supabase provides us with a PostgreSQL database for us to persist our application's data. Frontend accesses the database for sign-up and login. Backend accesses the database for the rest of the application logic.

## Details

Refer to our specific readmes for more details:

* [Frontend](./frontend/README.md)
* [Backend](./backend/README.md)
* [Supabase](./supabase/README.md)
