<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;


class PostController extends Controller
{
    public function createPost ( Request $request ){
        $post = new Post;
        $post->createPost($request);
        return response()->json($post);
    }

    public function showPost ($id){
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    public function listPost(){
        $post = Post::all();
        return response()->json([$post]);
    }

    public function updatePost(Request $request, $id){
        $post = Post::find($id);
        if($post){
            $post->updatePost($request);
            return response()->json($post);
        }
        return response()->json(['Post não encontrado']);

    }

    public function deletePost($id){
        if(Post::find($id)){
            Post::destroy($id);
            return response()->json(['Post deletado.']);
        }
        return response()->json(['Não foi possível encontrar o post.']);
    }
}
