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
                'nullable',
                'numeric',
                Rule::unique('chefs')->ignore($this->input('food_handler'), 'food_handler')
                ],
            'min_per_order' => 'sometimes|nullable|numeric',
            'bundle1' => 'sometimes|nullable',
            'bundle2' => 'sometimes|nullable',
            'bundle3' => 'sometimes|nullable',
            'bundle4' => 'sometimes|nullable',
            'order_deadline' => 'required|string',
            'payment_options' => 'sometimes|string',
            'delivery' => 'required|digits:1',
            'delivery_fee' => 'sometimes|nullable|string',
            'pickup' => 'required|digits:1',
            'pickup_pickup' => 'sometimes|nullable|string',
            'delivery_info' => 'sometimes|nullable|string',
            'pickup_info' => 'sometimes|nullable|string',
            'delivery_date' => 'sometimes|nullable|string',
            'pickup_date' => 'sometimes|nullable|string',
        ];
    }
}