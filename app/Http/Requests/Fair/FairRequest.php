<?php

namespace App\Http\Requests\Fair;

use Illuminate\Foundation\Http\FormRequest;

class FairRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'regular'     => 'required|between:0,99.99',
            'student'     => 'required|between:0,99.99',
            'minor'       => 'required|between:0,99.99',
            'pwd'         => 'required|between:0,99.99',
            'senior'      => 'required|between:0,99.99',
        ];
    }
}
