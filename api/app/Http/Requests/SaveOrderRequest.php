<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveOrderRequest extends FormRequest
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
            'order.orders_user_id' => 'required|digits_between:1,11',
            'chef_id' => 'required|digits_between:1,11',
            'order.meal_details' => 'required|array',
            'order.customer_details' => 'required',
            'order.order_details' => 'required',
            'order.order_total' => 'required|numeric',
            'email' => 'required|email',
            'id' => 'required|string',
        ];
    }
}