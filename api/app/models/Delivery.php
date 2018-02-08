<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{

    /**
     * The attributes that are mass assignable or guarded.
     *
     * @var array
     */
    protected $guarded = [
        'delivery_id'
    ];

    protected $table = 'deliveries';
    protected $primaryKey = 'delivery_id';
    /**
     * Relationship with `orders` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'deliveries_orders_id', 'id');
    }
}
