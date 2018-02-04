<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{

    protected $guarded = [
        'rating_id'
    ];

    protected $table = 'ratings';
    protected $primaryKey = 'rating_id';
    /**
     * Get the chef that owns the rating.
     */
    public function chefs()
    {
        return $this->belongsTo('OrchidEats\Models\Chef', 'ratings_chef_id', 'chef_id');
    }

    public function orders() {
        return $this->belongsTo('OrchidEats\Models\Order', 'ratings_order_id', 'order_id');
    }
}
