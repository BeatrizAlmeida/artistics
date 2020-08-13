<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Http\Request;
use App\Comment;
use App\Post;
use Illuminate\Database\Eloquent\Model;
Use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use Notifiable;
    //Passport
    use HasApiTokens; 
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationship 1 to N with Post    
    public function posts(){
        return $this->hasMany('App\Post');
    }

    // Relationship 1 to N with Comment    
    public function comments(){
        return $this->hasMany('App\Comment');
    }

    // Relationship N to N - rturns the people that the user is followed
    public function followers(){
        return $this->belongsToMany('App\User','follower_user', 'user_id', 'follower_id');
    }

    // Relationship N to N - returns the people the user follows    
    public function following(){
        return $this->belongsToMany('App\User','follower_user', 'follower_id', 'user_id');
    }

    // Relationship N to N - user likes post    
    public function like(){
        return $this->belongsToMany('App\Post');
    }
    
    public function createUser(UserRequest $request ){
        $this->name = $request->name;
        $this->email = $request->email;
        $this->moderator = $request->moderator;
        $this->password =  bcrypt($request->password);
        $this->phone = $request->phone;
        $this->biography = $request->biography;

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
        $this->save();
    }

    public function updateUser(UserRequest $request ){
        if($request->name) {
            $this->name = $request->name;
        }
        if($request->email) {
            $this->email = $request->email;
        }
        if($request->moderator) {
            $this->moderator = $request->moderator;
        }
        if($request->password) {
            $this->password =  bcrypt($request->password);
        }
        if($request->phone) {
            $this->phone = $request->phone;
        }
        if($request->biography) {
            $this->biography = $request->biography;
        }
        if( $request->image){
            Storage::delete($this->image);
            $file= $request->file('image');
            $filename= rand().'.'.$file->getClientOriginalExtension();
            $path=$file->storeAs('localPhotos', $filename);
            $this->image=$path;
        }
        $this->save();
    }
    

    use SoftDeletes;
    

}
