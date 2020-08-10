<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function createUser ( UserRequest $request ){
        $user = new User;
        $user->createUser($request);
        return response()->json($user);
    }

    public function showUser ($id){
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function listUser(){
        $user = User::all();
        return response()->json([$user]);
    }

    public function updateUser(UserRequest $request, $id){
        $user =  User::find($id);
        if($user){
            $user->updateUser($request);
            return response()->json($user);
        }
        return response()->json(['usuário não encontrado']);

    }

    //remove with SoftDelete
    public function deleteUser($id){
        if(User::find($id)){
            User::destroy($id);
            return response()->json(['Usuário deletado.']);
        }
        return response()->json(['Não foi possível encontrar o usuário.']);
    }

    //list all users soft deleted
    public function deletedUser(){
        $query= User::onlyTrashed()->get();
        return response()->json($query);
        
    }

    //restore an user soft deleted
    public function restoreUser($id){
        if(User::withTrashed()->where('id', $id)->restore()){
            return response()->json(['Usuário restaurado ao sistema.']);
        }
        return response()->json(['Usuário não encontrado.']);
  
    }

    // permanently deletes
    public function forceDelete($id){
        $user = User::find($id);
        if($user){
            $user->forceDelete();
            return response()->json(['Usuário deletado.']);
        }
        return response()->json(['Não foi possível encontrar o usuário.']);
    }

    public function follow($user_id, $follower_id){
        $user = User::findOrFail($user_id);
        $user->followers()->attach($follower_id);
        return response()->json($user);
    }
    public function unfollow($user_id, $follower_id){
        $user = User::findOrFail($user_id);
        $user->followers()->detach($follower_id);
        return response()->json($user);
    }
}
