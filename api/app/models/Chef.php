<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Chef extends Model
{

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'chef_id'
    ];

    protected $table = 'chefs';
    protected $primaryKey = 'chef_id';


    /**
     * Get the user that owns the chef account.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'chef_id', 'id');
    }

    /**
     * Relationship with `ratings` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ratings()
    {
        return $this->hasMany(Rating::class, 'ratings_chef_id', 'chef_id');
    }

    /**
     * Relationship with `meals` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function meals()
    {
        return $this->hasMany(Meal::class, 'meals_chef_id', 'chef_id');
    }

    /**
     * Relationship with `orders` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'orders_chef_id', 'chef_id');
    }

    /**
     * Relationship with `diets` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function diets()
    {
        return $this->hasOne(Diet::class, 'diets_chef_id', 'chef_id');
    }

    public static function boot()
    {
        parent::boot();
        static::created(function($model) {
            $diet = new Diet;
            $diet->diets_chef_id = $model->chef_id;
            $diet->save();

        });
    }
}
