<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PostRequest;


class Post extends Model
{

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function like(){
        return $this->belongsToMany('App\User');
    }

    public function createPost(PostRequest $request ){
        $this->text = $request->text;
        $this->title = $request->title;
        $this->category = $request->category;
        $this->user_id = $request->user_id;

        //makes a new folder if it doesen't exists then saves in database the path of the file
        if( $request->image){
            if (!Storage::exists('localPhotos/')){
                Storage::makeDirectory('localPhotos/', 0775,true);
            }
            $file= $request->file('image');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localPhotos', $filename);
            Storage::setVisibility($path, 'public');
            $this->image=$path;
        }

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
