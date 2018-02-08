<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'order_id'
    ];

    protected $table = 'orders';
    protected $primaryKey = 'order_id';

    /**
     * Relationship with `chefs` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function chefs()
    {
        return $this->belongsTo(Chef::class, 'orders_chef_id', 'chef_id');
    }

    /**
     * Relationship with `users` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function users()
    {
        return $this->belongsTo(User::class, 'orders_user_id', 'id');
    }

    /**
     * Relationship with `ratings` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function ratings()
    {
        return $this->hasOne(Rating::class,
            'ratings_order_id', 'order_id');
    }

    /**
     * Relationship with `deliveries` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function delivery()
    {
        return $this->hasOne(Delivery::class,
            'deliveries_order_id', 'order_id');
    }

//    creates delivery for each Order once order is created
    public static function boot()
    {
        parent::boot();
        static::created(function($model)
        {
            $delivery = new Delivery;
            $delivery->deliveries_order_id = $model->order_id;
            $delivery->save();
        });
    }
}
