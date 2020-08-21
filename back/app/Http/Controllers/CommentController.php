<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Post;
use App\User;
use App\Http\Requests\CommentRequest;


class CommentController extends Controller
{
    public function createComment ( CommentRequest $request ){
        $comment = new Comment;
        $comment->createComment($request);
        return response()->json($comment);
    }

    public function showComment ($id){
        $comment =  Comment::find($id);
        if($comment){
            return response()->json($comment);
        }
        return response()->json(['Não foi possível encontrar o comentário.']);
    }

    public function listComment(){
        $comment = Comment::all();
        return response()->json([$comment]);
    }

    public function updateComment(CommentRequest $request, $id){
        $comment =  Comment::find($id);
        $comment->updateComment($request);        
        return response()->json($comment);
    }

    public function deleteComment($id){
        Comment::destroy($id);
        return response()->json(['Comentário deletado.']);
    }
    
    /**
     * return the comments for the especified post
     *
     * @param  integer $post_id
     * @return array
     */
    public function commentInPost($post_id){
        $post = Post::find($post_id);
        if($post){
            $comments = $post->comments;
            return response()->json($comments);
        }else{
            return response()->json(['Este post não existe.']);
        }
    }
}
