<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{

    protected $table = 'ratings';
    protected $primaryKey = 'rating_id';
    /**
     * Get the chef that owns the rating.
     */
    public function chefs()
    {
        return $this->belongsTo('OrchidEats\Models\Chefs', 'ratings_chef_id', 'chef_id');
    }
}
