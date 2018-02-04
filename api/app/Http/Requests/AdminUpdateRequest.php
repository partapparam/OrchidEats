<?php
namespace OrchidEats\Http\Requests;

use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminUpdateRequest extends FormRequest
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
            'input.*.is_admin' => 'required|digits:1',
            'input.*.id' => 'required|digits:1'
        ];
    }
}