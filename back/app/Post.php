<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostRequest;
use App\Comment;

class Post extends Model
{

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function like(){
        return $this->belongsToMany('App\User');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function createPost(Request $request ){
        $this->text = $request->text;
        $this->title = $request->title;
        $this->category = $request->category;
        $this->image = $request ->image;
        $this->user_id = $request->user_id;

        if( $request->audio){
            if (!Storage::exists('localAudios/')){
                Storage::makeDirectory('localAudios/', 0775,true);
            }
            $file= $request->file('audio');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localAudios', $filename);
            $this->audio=$path;
        }
        $this->save();
    }

    public function updatePost(PostRequest $request ){
        if( $request->text){
            $this->text = $request->text;
        }
        if($request->title){
            $this->title = $request->title;
        }
        if($request->category){
            $this->category = $request->category;
        }       
        if( $request->image){
            Storage::delete($this->image);
            $file= $request->file('image');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localPhotos', $filename);
            $this->image=$path;
        }

        if( $request->audio){
            Storage::delete($this->audio);
            $file= $request->file('audio');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localAudios', $filename);
            $this->audio=$path;
        }
        $this->save();
    }
}
