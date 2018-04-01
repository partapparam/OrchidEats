<?php

namespace OrchidEats\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class DirectoryResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request) : array
    {
        return [
            'chef_id' => $this->chef->chef_id,
            'chefs_user_id' => $this->chef->chefs_user_id,
            'rating' => $this->chef->ratings()->avg('rating'),
            'diets' => [
                'keto' => $this->chef->diets->keto,
                'paleo' => $this->chef->diets->paleo,
                'high_fat' => $this->chef->diets->high_fat,
                'low_carb' => $this->chef->diets->low_carb,
                'high_protein' => $this->chef->diets->high_protein,
                'vegan' => $this->chef->diets->vegan,
                'vegetarian' => $this->chef->diets->vegetarian,
            ],
            'first_name' => $this->first_name,
            'city' => $this->profile->city,
            'food_handler' => $this->chef->food_handler ?? null,
            'photo' => $this->profile->photo,
            'galleries' => $this->chef->galleries()->first()->url ?? (env('DEFAULT_MEAL'))
        ];
    }
}
