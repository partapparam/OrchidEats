<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderReqsRequest extends FormRequest
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
                'required',
                'numeric',
                Rule::unique('chefs')->ignore($this->input('food_handler'), 'food_handler')
                ],
            'min_per_order' => 'required|numeric',
            'order_deadline' => 'required|string',
            'oe_delivery' => 'required|digits:1',
            'pickup' => 'sometimes|nullable|digits:1',
            'weekly_order_limit' => 'sometimes|nullable|numeric',
            'keto' => 'sometimes|nullable|digits:1',
            'paleo' => 'sometimes|nullable|digits:1',
            'high_fat' => 'sometimes|nullable|digits:1',
            'low_carb' => 'sometimes|nullable|digits:1',
            'high_protein' => 'sometimes|nullable|digits:1',
            'vegan' => 'sometimes|nullable|digits:1',
            'vegetarian' => 'sometimes|nullable|digits:1',
        ];
    }
}