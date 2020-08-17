<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//User
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//CRUD USER
Route::get('showUser/{id}','UserController@showUser');
Route::get('listUser','UserController@listUser');
Route::post('createUser','UserController@createUser');
Route::put('updateUser','UserController@updateUser')->middleware('auth:api');
Route::delete('deleteUser/{id}','UserController@deleteUser');

//soft deleted users
Route::get('deletedUser','UserController@deletedUser');

// restore soft deleted user
Route::put('restoreUser/{id}','UserController@restoreUser');

// permanently deletes
Route::delete('forceDelete/{id}','UserController@forceDelete');

//user follow 
Route::get('listFollowingPosts','UserController@listFollowingPosts')->middleware('auth:api');
Route::get('numberFollowers/{id}','UserController@numberFollowers');
Route::get('numberFollowing/{id}','UserController@numberFollowing');
Route::put('follow/{id}/{follower_id}','UserController@follow');
Route::delete('unfollow/{id}/{follower_id}','UserController@unfollow');

//user likes or dislikes post
Route::group(['middleware'=>'auth:api'], function(){
    Route::put('like/{post_id}','UserController@like');
    Route::delete('dislike/{post_id}','UserController@dislike');
}); 
Route::get('checkLikes/{id}/{post_id}','UserController@checkLikes');



//Post
//CRUD
Route::get('showPost/{id}','PostController@showPost');
Route::get('listPost','PostController@listPost');
Route::group(['middleware'=>'auth:api'], function(){
    Route::post('createPost','PostController@createPost');
    Route::put('updatePost/{id}','PostController@updatePost')->middleware('post.owner');
    Route::delete('deletePost/{id}','PostController@deletePost')->middleware('moderatorOrOwner.post');
});

// likes in the post
Route::get('numberLikes/{id}','PostController@numberLikes');


//Comment
//CRUD
Route::get('showComment/{id}','CommentController@showComment');
Route::get('listComment','CommentController@listComment');
Route::group(['middleware'=>'auth:api'], function(){
    Route::post('createComment','CommentController@createComment');
    Route::put('updateComment/{id}','CommentController@updateComment')->middleware('comment.owner');
    Route::delete('deleteComment/{id}','CommentController@deleteComment')->middleware('moderatorOrOwner.comment');
});


//PASSPORT
Route::post('register', 'API\PassportController@register');
Route::post('login', 'API\PassportController@login');
Route::group(['middleware'=>'auth:api'], function(){
    Route::get('logout', 'API\PassportController@logout');
    Route::get('getDetails', 'API\PassportController@getDetails');
}); 