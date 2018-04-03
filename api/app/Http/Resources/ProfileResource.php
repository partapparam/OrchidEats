<?php
namespace OrchidEats\Http\Resources;
use Illuminate\Http\Resources\Json\Resource;

class ProfileResource extends Resource
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
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'is_chef' => $this->is_chef,
            'approved' => $this->approved,
            'diet' => $this->chef->diets ?? null,
            'gender' => $this->profile->gender ?? null,
            'dob' => $this->profile->dob ?? null,
            'phone' => $this->profile->phone ?? null,
            'photo' => $this->profile->photo ?? null,
            'food_handler' => $this->chef->food_handler ?? null,
            'address' => $this->profile->address ?? null,
            'city' => $this->profile->city ?? null,
            'state' => $this->profile->state ?? null,
            'zip' => $this->profile->zip ?? null,
            'bio' => $this->profile->bio ?? null,
        ];
    }
}