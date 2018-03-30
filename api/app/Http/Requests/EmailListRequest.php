<?php
/**
 * Created by PhpStorm.
 * User: paramsingh
 * Date: 3/10/18
 * Time: 7:07 PM
 */

namespace OrchidEats\Http\Requests;
use Dingo\Api\Http\FormRequest;
use Illuminate\Validation\Rule;
class EmailListRequest extends FormRequest
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
            'email' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'chef_user_id' => 'sometimes|numeric'
        ];
    }
}