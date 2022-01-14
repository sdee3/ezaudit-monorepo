# EZ Audit

![Google Lighthouse](https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg)

The next best thing after [Google Lighthouse](https://developers.google.com/web/tools/lighthouse). A Laravel API featuring Next.js on the frontend side, with PNPM, Typescript, ESLint, and Styled Components.

## Dev Requirements

* PHP >= 8.0
* [Composer](https://getcomposer.org/)
* Docker with Docker Compose
* Node.js >= 16
* [PNPM](https://pnpm.io/) installed globally (`npm i -g pnpm`)
* Lighthouse installed globally (`npm i -g lighthouse`)

## Initializing the local development environment

To get both Laravel and Next.js apps up and running, it's recommended to go through the following steps:

1. Create a `.env` file both on the root and in `/client` (based on the example files) 📝
   1. You have to set 3 path variables in Laravel's `.env`:
      1. `APP_NODE_PATH` points to your Node.js executable. Find it by typing `which node` in your terminal
      2. `APP_LIGHTHOUSE_PATH` points to your global installation of Lighthouse. Find it with `which lighthouse`.
      3. `APP_PUBLIC_PATH` is the absolute path to this project's **public** folder
2. `docker-compose up --detach` 🎣
3. `composer install` 🎶
4. `pnpm i` 🖥

After those steps, you will be able to do the following:

* `pnpm build` to run the first build of the Next.js app 🥇
* `pnpm dev` on the project root to run the Laravel Serve command, the [Laravel queue listener](https://laravel.com/docs/8.x/queues), and the Next.js app with hot reloading 👂🏼
* `pnpm cy:open` after starting the dev environment will open Cypress 🧪
  * Note that `pnpm cy:run` also exists, which will just run all tests in headless mode.

## License

The EZ Audit project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
