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
    //For Authentication
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

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function followers(){
        return $this->belongsToMany('App\User','follower_user', 'user_id', 'follower_id');
    }

    public function following(){
        return $this->belongsToMany('App\User','follower_user', 'follower_id', 'user_id');
    }

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
        $this->image=$request->image;
        
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
        if($request->image){
            $this->image=$request->image;
        }
        $this->save();
    }
    

    use SoftDeletes;
    

}
