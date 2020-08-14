<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Post;


class PostRequest extends FormRequest
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
                'category' =>'required|string',
                'title' =>'string|nullable',
                'text' =>'nullable',
                'image' =>'image',
                'audio' =>'file|mimetypes:audio/x-aac,aac,audio/mpeg,mp3,audio/ogg,audio/x-flac,flac,audio/x-wav,wav,audio/x-ms-wma,wma',
            ];
        }
        if($this->isMethod('put')){
            return [
                'category' =>'string',
                'title' =>'string|nullable',
                'text' =>'nullable',
                'image' =>'image',
                'audio' =>'file|mimetypes:audio/x-aac,aac,audio/mpeg,mp3,audio/ogg,audio/x-flac,flac,audio/x-wav,wav,audio/x-ms-wma,wma',
            ];
        }
    }

    public function messages(){
        return[
            'category.required'=>'Insira a categoria de seu post.',
            'image.image'=>'Neste campo deve ser enviado uma imagem.',
            'audio.file'=>'Este campo deve ser preenchido com um arquivo.',
            'audio.mimetypes'=>'Este campo deve ser preenchido com um arquivo em formato de áudio.',
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
