<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Post;
use App\Http\Requests\UserRequest;
use Auth;

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
        if($user_id == $follower_id){
            return response()->json(['Usuário não pode seguir a si mesmo.']);
        }
        $user = User::findOrFail($user_id);
        $user->followers()->attach($follower_id);
        return response()->json($user);
    }

    public function unfollow($user_id, $follower_id){
        $user = User::findOrFail($user_id);
        $user->followers()->detach($follower_id);
        return response()->json($user);
    }

    // returns the number of user followers
    public function numberFollowers($id){
        $user =  User::find($id);
        if($user){
            return response()->json($user->followers()->pluck('follower_id')->count());
        }
        return response()->json(['Não foi possível encontrar o usuário.']);
    }

    //returns the number of user following
    public function numberFollowing($id){
        $user =  User::find($id);
        if($user){
            return response()->json($user->following()->pluck('user_id')->count());
        }
        return response()->json(['Não foi possível encontrar o usuário.']);
    }

    //user likes a post
    public function like($post_id){
        $user = Auth::user();
        $post =  Post::find($post_id);
        if($post){
            $user->like()->attach($post_id);
            return response()->json($user);
        }else{
            return response()->json(['Este post não existe.']);
        }        
    }

    //user dislike a post
    public function dislike($post_id){
        $user = Auth::user();
        $post =  Post::find($post_id);
        if($post){
            $user->like()->detach($post_id);
            return response()->json($user);
        }else{
            return response()->json(['Este post não existe.']);
        }        
    }

    //checks if the user has already liked the post
    public function checkLikes($user_id, $post_id){
        if($user_id != null){
            $user = User::find($user_id);
            $post =  Post::find($post_id);
            if($post){
                foreach($user->like()->pluck('post_id') as $post){
                    if($post == $post_id){
                        return response()->json(['Curtido']);
                    }
                }
            }else{
                return response()->json(['Este post não existe.']);
            }       
        }                
    }
}
