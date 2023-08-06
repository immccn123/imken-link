# Imken.link Short Link Project

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue)](https://www.gnu.org/licenses/agpl-3.0.html)

**Note: This project is under development and features might be unstable. There are known bugs that have not been fixed yet.**

## Introduction

Imken.link Short Link Project is a tool designed for generating short links, primarily intended for personal use. It offers basic functionality for creating and managing short links, along with planned enhancements for the future.

Implemented features:

- [X] Create/Delete short links

Planned features:

- [ ] Generate short links through API calls
- [ ] Multi-user and permission management
- [ ] One-click deployment (Railways)

## Building and Deployment

Before building and deploying the project, certain configurations and environment variables need to be set up. Here are the basic steps for building and deploying:

1. Configure environment variables: Refer to the "Development" section below for setting up the necessary environment variables.

2. You can refer to the `build.sh` script in the root directory for performing build and deployment operations. Typically, you can use `nixpack` for packaging.

Run the server:

```bash
uvicorn main:app --host <host> --port <port>
```

## Development

Before starting development, you need to set up some environment variables to ensure proper functioning of the project. Here are the steps required for development:

1. Set up environment variables: Before starting development, make sure to set up the following environment variables to connect to the PostgreSQL database and perform other necessary configurations.

   - `PGSQL_URL`*: URL to connect to the PostgreSQL database.
   - `SETUP_KEY`: Verification key used during initial installation to create a user (usable only once). If left blank, a random key will be generated and displayed in standard output.
   - `VITE_SITE_NAME`*: If you need to build a frontend, please fill in this variable as your website name.

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the development server (hot reload is supported):

```bash
uvicorn main:app --reload
```

## License

This project is released under the AGPL-3.0 license. For proprietary usage, please contact the author for licensing details.

## Subrepositories

- Frontend Repository: [imken-link-web](https://github.com/immccn123/imken-link-web)
