<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
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
        return $this->belongsTo('OrchidEats\models\Chefs', 'orders_chef_id', 'chef_id');
    }

    /**
     * Relationship with `users` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function users()
    {
        return $this->belongsTo('OrchidEats\models\User', 'orders_user_id', 'id');
    }

    /**
     * Relationship with `order_details` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function order_details()
    {
        return $this->hasOne('OrchidEats\models\OrderDetails', 'od_order_id', 'order_id');
    }
}
