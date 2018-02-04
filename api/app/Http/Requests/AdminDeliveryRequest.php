<?php
namespace OrchidEats\Http\Requests;

use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminDeliveryRequest extends FormRequest
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
            'input.*.completed' => 'required|digits:1',
            'input.*.delivery_id' => 'required|digits:1',
            'input.*.driver' => 'sometimes|string'
        ];
    }
}