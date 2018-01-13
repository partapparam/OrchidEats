<?php

function generate_token() {
    return uniqid(bin2hex(random_bytes(8)));
}