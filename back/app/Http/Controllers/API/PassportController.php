<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use DB;
use App\User;
use Laravel\Passport\HasApiTokens;
use Auth;
use App\Notifications\RegisterUser;

class PassportController extends Controller
{
    use HasApiTokens;

    public function register(UserRequest $request)
    {
        $newuser = new User;
        $newuser->createUser($request);
        $success['token']=$newuser->createToken('MyApp')->accessToken;
        $newuser->notify(new RegisterUser($newuser));
        return response()->json(['Success' => $success, 'user'=>$newuser],200);
    }

    public function login()
    {
        if(Auth::attempt(['email'=>request('email'), 'password'=>request('password')]))
        {
            $user = Auth::user();
            $success['token']=$user->createToken('MyApp')->accessToken;
            return response()->json(['Success'=>$success, 'user' => $user],200);
        }
        else
        {
            return response()->json(['error'=>'E-mail ou senha incorretos', 'status' => 401]);
        }
    }

    public function getDetails()
    {
        $user = Auth::user();
        return response()->json(['Success'=>$user],200);
    }

    public function logout()
    {
        $acessToken = Auth::user()->token();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $acessToken->id)->update(['revoked'=>true]);
        $acessToken->revoke();
        return response()->json(['Usuário deslogado.'], 200);
    }
}
