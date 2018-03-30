<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'photo_id'
    ];

    protected $table = 'galleries';
    protected $primaryKey = 'photo_id';


    /**
     * Get the user that owns the chef account.
     */
    public function chef()
    {
        return $this->belongsTo(Chef::class, 'galleries_chef_id', 'chef_id');
    }
}
