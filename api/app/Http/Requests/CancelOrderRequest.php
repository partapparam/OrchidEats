<?php
namespace OrchidEats\Http\Requests;

use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class CancelOrderRequest extends FormRequest
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
            'order_id' => 'required',
            'orders_chef_id' => 'required|digits:1',
            'orders_user_id' => 'required|digits:1',
            'order_total' => 'required',
            'completed' => 'required|digits:1',
            'reviewed' => 'required|digits:1',
            'delivery_window' => 'required|string',
            'delivery_date' => 'required|string',
            'meal_details' => 'required|string'
        ];
    }
}