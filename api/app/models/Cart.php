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
    protected $fillable = [
        'carts_user_id', 'chefs_order_deadline', 'details', 'expired', 'carts_chef_id'
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
