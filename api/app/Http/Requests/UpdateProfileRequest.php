<?php

namespace OrchidEats\Http\Requests;

use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->input('email'), 'email')
            ],
            'gender' => 'required',
            'dob' => 'required',
            'phone' => [
                'required',
                Rule::unique('profiles')->ignore($this->input('phone'), 'phone')
            ],
            'address' => 'required',
            'zip' => 'required',
            'bio' => 'required',
        ];
    }
}
