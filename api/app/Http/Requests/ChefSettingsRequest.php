<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChefSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'food_handler' => [
                'sometimes',
                'numeric',
                Rule::unique('chefs')->ignore($this->input('food_handler'), 'food_handler')
                ],
            'min_per_order' => 'required|nullable|numeric',
            'order_deadline' => 'required|string',
            'weekly_order_limit' => 'sometimes|nullable|numeric',

            'delivery' => 'required|digits:1',
            'delivery_fee' => 'sometimes|nullable|string',
            'pickup' => 'required|digits:1',
            'pickup_pickup' => 'sometimes|nullable|string',
            'delivery_info' => 'sometimes|nullable|string',
            'pickup_info' => 'sometimes|nullable|string',
            'delivery_date' => 'sometimes|nullable|string',
            'pickup_date' => 'sometimes|nullable|string',

            'keto' => 'sometimes|digits:1',
            'paleo' => 'sometimes|digits:1',
            'high_fat' => 'sometimes|digits:1',
            'low_carb' => 'sometimes|digits:1',
            'high_protein' => 'sometimes|digits:1',
            'vegan' => 'sometimes|digits:1',
            'vegetarian' => 'sometimes|digits:1'
        ];
    }
}