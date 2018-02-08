<?php

namespace OrchidEats\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class ProfileReource extends Resource
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
            'gender' => $this->profile->gender ?? null,
            'dob' => $this->profile->dob ?? null,
            'phone' => $this->profile->phone ?? null,
            'address' => $this->profile->address ?? null,
            'zip' => $this->profile->zip ?? null,
            'bio' => $this->profile->bio ?? null,
        ];
    }
}
