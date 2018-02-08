<?php

namespace OrchidEats\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class MarketplaceResource extends Resource
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
            'chef_id' => $this->chef_id,
            'rating' => $this->ratings()->avg('rating'),
            'price' => round($this->meals()->avg('price'), 2),
            'diets' => [
                'keto' => $this->diets->keto,
                'paleo' => $this->diets->paleo,
                'high_fat' => $this->diets->high_fat,
                'low_carb' => $this->diets->low_carb,
                'high_protein' => $this->diets->high_protein,
                'vegan' => $this->diets->vegan,
                'vegetarian' => $this->diets->vegetarian,
            ],
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
        ];
    }
}
