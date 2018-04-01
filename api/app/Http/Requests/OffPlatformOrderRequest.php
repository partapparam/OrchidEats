<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class OffPlatformOrderRequest extends FormRequest
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
            'orders_user_id' => 'sometimes|nullable|digits_between:1,11',
            'chef_id' => 'required|digits_between:1,11',
            'meal_details' => 'required|array',
            'customer_details' => 'required',
            'order_details' => 'required',
            'order_total' => 'required|numeric',
            'payment_method' => 'required|string'
        ];
    }
}