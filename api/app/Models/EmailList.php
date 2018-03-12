<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class EmailList extends Model
{

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'email_id'
    ];

    protected $table = 'email_lists';
    protected $primaryKey = 'email_id';

    /**
     * Get the user that owns the chef account.
     */
    public function chef()
    {
        return $this->belongsTo(Chef::class, 'emails_chef_id', 'chef_id');
    }
}
