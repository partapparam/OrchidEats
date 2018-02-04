<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Diet extends Model
{

    /**
 * The attributes that are mass assignable or guarded.
 *
 * @var array
 */
    protected $fillable = [
        'diets_chef_id', 'keto', 'high_protein', 'paleo', 'vegan', 'vegetarian', 'high_fat', 'low_carb'
    ];

    protected $table = 'diets';

    /**
     * Get the chef that owns the diets row.
     */
    public function chef()
    {
        return $this->belongsTo('OrchidEats\Models\Chef', 'diets_chef_id', 'chef_id');
    }
}
