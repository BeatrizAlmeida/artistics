<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\User;


class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if($this->isMethod('post')){
            return [
                'name' =>'required|string',
                'email' =>'required|email|unique:users,email',
                'password' =>'required|confirmed',
                'phone' =>'celular_com_ddd|nullable',
                'moderator' =>'required|boolean',
                'biography' =>'nullable',
                'image' =>'image|nullable',
            ];
        }
        if($this->isMethod('put')){
            return [
                'name' =>'string|nullable',
                'phone' =>'celular_com_ddd|nullable',
                'biography' =>'nullable',
                'moderator' =>'boolean',
                'image' =>'nullable|image',
            ];
        }
    }

    public function messages(){
        return[
            'name.required'=>'Insira seu nome.',
            'email.required'=>'Insira seu e-mail.',
            'email.email'=>'Insira um e-mail válido.',
            'email.unique'=>'Este e-mail já está cadastrado.',
            'password.required'=>'Insira sua senha.',
            'passowrd.confirmed'=>'As senhas inseridas não são compatíveis. Por favor, preencha novamente.',
            'moderator.boolean'=>'Moderador deve ter valor 0, para false, ou 1 para true. ',
            'phone.celular'=>'Este não é um formato válido de número celular. Formato válido: 99999-9999 ou 9999-9999',
            'image.image'=>'Neste campo deve ser enviado uma imagem.',
        ];
    }

    /**
     * If an error occurs, a JSON message will be sent informing the error
     *
     * @param  mixed $validator
     * 
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),
        422));
    }

}
