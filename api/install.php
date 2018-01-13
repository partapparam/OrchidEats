#!/usr/bin/env php

<?php

/**
 * Install composer dependencies
 */
function composerInstall() {
    if (! file_exists("vendor")) {
        try {
            echo shell_exec("composer install");
        } catch (Exception $e) {
            echo "Composer could not install dependencies. Reason: {$e->getMessage()}\n";
        }
    }
}

/**
 * Make .env file
 */
function makeDotEnv() {
    if (! file_exists(".env")) {
        if (! copy(".env.example", ".env")) {
            echo "Failed to create .env file. Reason: .env.example file not found\n";
        } else {
            echo ".env file initialized.\n";
            echo shell_exec("php artisan key:generate\n");
        }
    }
}

/**
 * Finally install the application
 */
function install() {
    composerInstall();
    makeDotEnv();
}

install();