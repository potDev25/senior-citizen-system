<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentRequest extends FormRequest
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
            "contact_email"      => 'required|email|unique:departments,contact_email',
            "contact_number"     => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:11|unique:departments,contact_number',
            "photo"              => 'required|image|mimes:png,jpg',
            "city"               => 'required',
            "province"           => 'required',
            "barangay"           => 'required',
            "head"               => 'required',
            "designation"        => 'required',
        ];
    }

    public function messages(){
        return [
            "contact_email.required"         => 'Please provide contact email',
            "contact_number.required"        => 'Please provide contact number',
            "head.required"                  => 'Please provide head department',
            "designation.required"           => 'Please provide designation',
            "city.required"                  => 'Please provide city address',
            "province.required"              => 'Please provide province address',
            "barangay.required"              => 'Please provide barangay address',
            "photo.required"                 => 'Please Provide Department Logo',
            "photo.mime"                     => 'Only Image Type is allow',
            "contact_number.regex"           => 'Contact number must be a valid contact number',
            "contact_number.min"             => 'Contact number must be a valid contact number',
        ];
    }
}
