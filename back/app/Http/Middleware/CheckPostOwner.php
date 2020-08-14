<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Post;

class CheckPostOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user_id = Auth::user()->id;
        $post = Post::find($request->id);
        if($post){
            if($post->user_id == $user_id){
                return $next($request);
            }
            else{
                return response()->json(['Você não é o dono desse post, não pode o apagar ou editar.']);
            }
        }else{
            return response()->json(['Este post não existe.']);
        }
    }
}
