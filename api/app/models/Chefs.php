<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Chefs extends Model
{

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'chefs_user_id', 'chef_id'
    ];

    protected $table = 'chefs';
    protected $primaryKey = 'chef_id';

    /**
     * Relationship with `ratings` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ratings()
    {
        return $this->hasMany('OrchidEats\models\Ratings', 'ratings_chef_id', 'chef_id');
    }

    /**
     * Relationship with `meals` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function meals()
    {
        return $this->hasMany('OrchidEats\models\Meals', 'meals_chef_id', 'chef_id');
    }
}
