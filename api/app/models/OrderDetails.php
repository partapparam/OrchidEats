<?php

namespace OrchidEats\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{

    protected $table = 'order_details';
    protected $primaryKey = null;

    /**
     * Relationship with `orders` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function orders()
    {
        return $this->belongsTo('OrchidEats\models\Orders', 'od_order_id', 'order_id');
    }
}
