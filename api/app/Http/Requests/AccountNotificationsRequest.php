<?php
namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;
class AccountNotificationsRequest extends FormRequest
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
            'email_note' => 'sometimes|digits:1',
            'text_note' => 'sometimes|digits:1'
        ];
    }
}