#!/usr/bin/env php

<?php
/**
 * Install bower dependencies
 */
function bowerInstall() {
    if (! file_exists("app/assets/bower_components")) {
        try {
            echo shell_exec("cd app && bower install");
        } catch (Exception $e) {
            echo "Bower could not install dependencies. Reason: {$e->getMessage()}\n";
        }
    }
}
/**
 * Install composer dependencies
 */
function composerInstall() {
    if (! file_exists("api/vendor")) {
        try {
            echo shell_exec("cd api && composer install");
        } catch (Exception $e) {
            echo "Composer could not install dependencies. Reason: {$e->getMessage()}\n";
        }
    }
}
/**
 * Make .env file
 */
function makeDotEnv() {
    if (! file_exists("api/.env")) {
        if (! copy("api/.env.example", "api/.env")) {
            echo "Failed to create api/.env file. Reason: api/.env.example file not found\n";
        } else {
            echo "api/.env file initialized.\n";
            echo shell_exec("php artisan key:generate\n");
        }
    }
}
/**
 * Finally install the application
 */
function install() {
    bowerInstall();
    composerInstall();
    makeDotEnv();
}
install();