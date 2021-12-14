# EZ Audit

![Google Lighthouse](https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg)

The next best thing after [Google Lighthouse](https://developers.google.com/web/tools/lighthouse). A Laravel API featuring Next.js on the frontend side, with PNPM, Typescript, ESLint, and Styled Components.

## Dev Requirements

* PHP >= 8.0
* [Composer](https://getcomposer.org/)
* Docker with Docker Compose
* Node.js >= 16
* [PNPM](https://pnpm.io/) installed globally

### Initializing the local development environment

To get both Laravel and Next.js apps up and running, it's recommended to go through the following steps:

1. Create a `.env` file both on the root and in `/client` (based on the example files)
2. `php artisan key:generate`
3. `composer install`
4. `docker-compose up --detach`
5. `php artisan migrate`
6. `pnpm i` both on the root and in `/client`
7. `cd client/ && pnpm build` to run the first build of the Next.js app
8. `pnpm dev` on the project root to run the Laravel Serve command, the [Laravel queue listener](https://laravel.com/docs/8.x/queues), and the Next.js app with hot reloading

## License

The EZ Audit project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
