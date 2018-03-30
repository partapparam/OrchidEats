<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    protected $guarded = [
        'message_id'
    ];

    protected $table = 'inboxes';
    protected $primaryKey = 'message_id';

    /**
     * Get the user that owns the user account.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'from_user_id', 'id');
    }

}
