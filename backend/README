# Backend

## Endpoints

Refer to [our documentation on our deployed backend](https://minimart-backend.nknguyenhc.net/docs) for details of our endpoints.

## Project Setup

### Install Dependencies

To install the necessary dependencies, run the following command:
```bash
npm install
```

### Setup local env variable
1. Copy .env.sample file and rename as .env
2. Assign value for all env variables.
  * For supabase variables, copy the values displayed when running `supabase start` in `supabase` folder.
  * For email password, change email host indicated in `src/controller/userManagementController.ts` from `smtp.zoho.com` to your email provider endpoint. For example, if you are using gmail, send it to `smtp.gmail.com`. Change the email from `admin@minimart.nknguyenhc.net` to your email address. Indicate your email password in the `.env` file.

### Running the Server

To run the Express server in development mode, use the following command:
```bash
npm run dev
```

To run the Express server in production mode, use the following command:
```bash
npm run build
npm start
```

### Docker

Alternatively, you can use docker to run the server, without the need for any dependency installation.

First, build the image with a tag:

```bash
docker build --tag minimart-backend .
```

Then, run the image, attaching port `3000` to container port `3000`:

```bash
docker run -p 3000:3000 -d minimart-backend
```

You can then visit http://localhost:3000 to visit the locally running backend.
