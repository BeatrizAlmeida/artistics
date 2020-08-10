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
Route::post('createUser','UserController@createUser');
Route::get('showUser/{id}','UserController@showUser');
Route::get('listUser','UserController@listUser');
Route::put('updateUser/{id}','UserController@updateUser');
Route::delete('deleteUser/{id}','UserController@deleteUser');
//soft deleted users
Route::get('deletedUser','UserController@deletedUser');
// restore soft deleted user
Route::put('restoreUser/{id}','UserController@restoreUser');
// permanently deletes
Route::delete('forceDelete/{id}','UserController@forceDelete');
//user follow user
Route::put('follow/{id}/{follower_id}','UserController@follow');

//Post
//CRUD
Route::post('createPost','PostController@createPost');
Route::get('showPost/{id}','PostController@showPost');
Route::get('listPost','PostController@listPost');
Route::put('updatePost/{id}','PostController@updatePost');
Route::delete('deletePost/{id}','PostController@deletePost');

//Comment
//CRUD
Route::post('createComment','CommentController@createComment');
Route::get('showComment/{id}','CommentController@showComment');
Route::get('listComment','CommentController@listComment');
Route::put('updateComment/{id}','CommentController@updateComment');
Route::delete('deleteComment/{id}','CommentController@deleteComment');
