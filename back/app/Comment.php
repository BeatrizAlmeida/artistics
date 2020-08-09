<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class Comment extends Model
{
    // Relationship 1 to N with user    
    public function user(){
       return  $this->belongsTo('App\User');
    }

    // Relationship 1 to N with post 
    public function post(){
        return $this->belongsTo('App\Post');
    }

    public function createComment(Request $request ){
        $this->text = $request->text;
        if( $request->image){
            if (!Storage::exists('localPhotos/')){
                Storage::makeDirectory('localPhotos/', 0775,true);
            }
            $file= $request->file('image');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localPhotos', $filename);
            $this->image=$path;
        }
        $this->user_id = $request->user_id;
        $this->post_id = $request->post_id;

        $this->save();
    }

    public function updateComment(Request $request){

        if ($request->text){
            $this->text = $request->text;
        }
        if ($request->image){
            Storage::delete($this->image);
            $file= $request->file('image');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localPhotos', $filename);
            $this->image=$path;
        }
       
        $this->save();
    }
}
