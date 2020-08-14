<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Comment;

class CheckCommentOwner
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
        $comment = Comment::find($request->id);
        if($comment){
            if($comment->user_id == $user_id){
                return $next($request);
            }
            else{
                return response()->json(['Você não é o dono desse comentário, não pode o apagar ou editar.']);
            }
        }else{
            return response()->json(['Este comentário não existe.']);
        }
    }
}
