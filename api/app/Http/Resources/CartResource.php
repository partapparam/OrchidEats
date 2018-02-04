<?php
namespace OrchidEats\Http\Resources;
use Illuminate\Http\Resources\Json\Resource;

class CartResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'cart_id' => $this->cart->cart_id,
            'carts_user_id' => $this->cart->when($this->cart->expired = 0, $this->cart->carts_user_id) ?? null,
            'order_deadline' => $this->cart->chefs_order_deadline,
            'details' => json_decode($this->cart->details),
            'expired' => $this->cart->expired,
            'created_at' => $this->cart->created_at
        ];
    }
}