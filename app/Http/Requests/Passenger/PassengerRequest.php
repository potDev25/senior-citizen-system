<?php

namespace App\Http\Requests\Passenger;

use Illuminate\Foundation\Http\FormRequest;

class PassengerRequest extends FormRequest
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
            "last_name" => 'required',
            "first_name" => 'required',
            "contact_email" => 'required|email|unique:passengers,email',
            "contact_number" => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:11|unique:passengers,contact_number',
            "gender" => 'required',
            "birthdate" => 'required',
            "city" => 'required',
            "province" => 'required',
            "barangay" => 'required',
            "type" => 'required',
            "age" => 'required',
            "password" => 'required|confirmed|min:8',
            "password_confirmation" => 'required',
        ];
    }

    public function messages(){
        return [
            "last_name.required"             => 'Please provide last name',
            "first_name.required"            => 'Please provide first name',
            "contact_email.required"         => 'Please provide contact email',
            "contact_number.required"        => 'Please provide contact number',
            "gender.required"                => 'Please provide gender',
            "birthdate.required"             => 'Please provide birthdate',
            "city.required"                  => 'Please provide city address',
            "province.required"              => 'Please provide province address',
            "barangay.required"              => 'Please provide barangay address',
            "type.required"                  => 'Please select Type',
            "password.required"              => 'Please enter password',
            "password_confirmation.required" => 'Please confirm password',
            "age.required"                   => 'Please Provide Age',
            "contact_number.regex"           => 'Contact number must be a valid contact number',
            "contact_number.min"             => 'Contact number must be a valid contact number',
        ];
    }
}
