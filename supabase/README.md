# Database

## Project Setup

### Install Dependencies

To install the necessary dependencies, run the following command:
```bash
npm install
```

### Running Supabase locally

Prerequisite:
- Install Docker Desktop and configure based on these [steps](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows#running-supabase-locally)

To start local database (Takes time on the first run):
```bash
npm start
```
Then access the Studio URL for Supabase UI.

To apply the new migration:
```bash
npm run reset
```

To stop the database without resetting it:
```bash
npm run stop
```

### Auto generate migration scripts from changes applied using UI:
```bash
npx supabase db diff -f <script_name>
```

## Auto generate typescript types file in BE and FE folder:
```bash
npm run genTypes
```
- Run this script when there are new changes in database schema
- Refer to [documentation](https://supabase.com/docs/guides/api/rest/generating-types) for more details

### Troubleshooting
Reference for troubleshooting: [Documentation](https://supabase.com/docs/guides/deployment/managing-environments?queryGroups=environment&environment=production#troubleshooting)