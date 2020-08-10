<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Comment;


class CommentRequest extends FormRequest
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
                'image' =>'image',
                'text' =>'nullable',
            ];
        }
        if($this->isMethod('put')){
            return [
                'image' =>'image',
                'text' =>'nullable',
            ];
        }
    }

    public function messages(){
        return[
            'image.image'=>'Neste campo deve ser enviado uma imagem.',
        ];

    }

    /**
     * 
     * If an error occurs, a JSON message will be sent informing the error
     *
     * 
     */

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),
        422));
    }
}
