# Requirements
* Composer
* Bower
* Web server like: Apache or Nginx

# Installation
* Clone the repo
* Make `app` & `api` folder two `virtualhost` entries into your web server configuration. Add the virtual domains into the `hosts` file.
Example:
  * `app` folder will be the main `angular` app. The domain should be: `http://orchideats.test`
  * `api` folder will be the `php` api. The domain should be: `http://api.orchideats.test`
* Change directory to `api` folder & run `composer install`
* Change directory to `app` folder & run `bower install`
* Open `api/core/Database.php` & modify database credentials at line 12
* (Optional) Change `jwtsecret` in `api/config.php` file at line 4
* (Optional) Change `algo` in `api/config.php` file at line 5. [See the supported algorithms](https://github.com/firebase/php-jwt)

Now you are good to go! Open your favorite browser.
Try to access `http://orchideats.test`. You should see "Welcome home" in `h1` tag.
Try to access `http://api.orchideats.test`. You should see `{"message":"Welcome to OrchidEats API"}`
