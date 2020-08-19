<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
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
        $comment->updateComment($request);        
        return response()->json($comment);
    }

    public function deleteComment($id){
        Comment::destroy($id);
        return response()->json(['Comentário deletado.']);
    }
}
