<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Webhook extends Model
{
    protected $guarded = [
        'webhook_id'
    ];

    protected $table = 'webhooks';
    protected $primaryKey = 'webhook_id';

}
