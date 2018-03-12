<?php
namespace OrchidEats\Http\Resources;
use Illuminate\Http\Resources\Json\Resource;
use OrchidEats\Models\Chef;

class OrderResource extends Resource
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
            'photo' => $this->profile->photo,
            'first_name' => $this->first_name,
            'id' => $this->id,
            'email' => $this->email,
            'phone' => $this->profile->phone
        ];
    }
}