# Frontend

## Project Setup

### Install Dependencies

To install the necessary dependencies, run the following command:
```bash
npm install
```

### Running the Server

To run the frontend with Vite in development mode, use the following command:
```bash
npm run dev
```

### Build and test

Build the application to prepare for deployment:

```bash
npm run build
```

You can now test the build to ensure it looks the same as development.

```bash
serve -s dist
```

### Deployment

Run the following command to deploy to Github Pages. Note that you do not need to build before running this command.

```bash
npm run deploy
```

The command will push a new commit to `gh-pages` branch on the remote repository, which will initiate a new deployment.
