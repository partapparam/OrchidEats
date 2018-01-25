<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Meals extends Model
{

    protected $table = 'meals';
    protected $primaryKey = 'meal_id';
    /**
     * Get the chef that owns the rating.
     */
    public function chefs()
    {
        return $this->belongsTo('OrchidEats\Models\Chefs', 'meals_chef_id', 'chef_id');
    }
}
