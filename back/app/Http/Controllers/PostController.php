<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    public function createPost ( PostRequest $request ){
        $post = new Post;
        $post->createPost($request);
        return response()->json($post);
    }

    public function showPost ($id){
        $post =  Post::find($id);
        if($post){
            return response()->json($post);
        }
        return response()->json(['Não foi possível encontrar o post.']);
    }

    public function listPost(){
        $post = Post::all();
        return response()->json([$post]);
    }

    public function updatePost(PostRequest $request, $id){
        $post->updatePost($request);
        return response()->json($post);
    }

    public function deletePost($id){
        Post::destroy($id);
        return response()->json(['Post deletado.']);
    }
    
    public function numberLikes($id){
        $post =  Post::find($id);
        if($post){
            return response()->json($post->like()->count());
        }
        return response()->json(['Não foi possível encontrar o post.']);
    }
}
