<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class StripeTokenRequest extends FormRequest
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
            '0' => 'required|string',
            '1' => 'required|string',
        ];
    }
}