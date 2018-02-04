<?php
namespace OrchidEats\Http\Requests;

use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminOrderRequest extends FormRequest
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
            'input.*.completed' => 'required|nullable|digits:1',
            'input.*.order_id' => 'required|digits:1'
        ];
    }
}