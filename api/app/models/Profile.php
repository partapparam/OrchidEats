<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Profile extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'profile_id'
    ];

    protected $table = 'profiles';
    protected $primaryKey = 'profile_id';    /**
     * Get the user that owns the phone.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
