## Introduction
This project uses couple of helper packages:

* API management: [Dingo API](https://github.com/dingo/api/wiki)
* CORS management: [Laravel cors](https://github.com/barryvdh/laravel-cors)
* JWT management: [JWT Auth](https://github.com/tymondesigns/jwt-auth)
* (Optional) [Laravel IDE helper](https://github.com/barryvdh/laravel-ide-helper)

## Installation
* Run `composer install`
* Copy `.env.example` to `.env`
* Tweak `.env` as needed
* Make virtual host like `api.orchideats.test` or run `php artisan serve`

After successful installation, you should be able to access `http://{YOUR_URL}/api/v1` and see `{"status": "success"}`

## Description
This project is the API part. The API uses version.

* Routes are placed in `routes/api/{version_number}.php`
* Routes are managed using [Dingo API](https://github.com/dingo/api/wiki). Please refer to Dingo API doc for more details.
* Controllers are placed in `app/Http/Controllers` folder
* Models are placed in `app/Models` folder
* Middlewared are placed in `app/Http/Middleware` folder
* Input fields are validated using [Laravel Form Validation](https://laravel.com/docs/5.5/validation#form-request-validation)
* Form request validation files are placed in `app/Http/Requests` folder
* Future form request validation classes must extend `Dingo\Api\Http\FormRequest`