<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'cart_id'
    ];

    protected $table = 'carts';
    protected $primaryKey = 'cart_id';

    /**
     * Get the user that owns the chef account.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'carts_user_id', 'id');
    }
}
