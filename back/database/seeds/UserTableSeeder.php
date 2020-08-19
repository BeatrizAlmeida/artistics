<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //includes a default admin
        DB::table('users')->insert([
            'name' => 'moderator',
            'email' => 'moderatorArtistics'.'@gmail.com',
            'password' =>bcrypt('@senhaPadrao#'),
            'moderator'=> 1,
        ]);
        factory (App\User::class,5)->create()->each(function ($user){
            //1 to N relationship with Post
            $post = factory(App\Post::class,2)->make();
            $user->posts()->saveMany($post);
            //1 to N relationship with Comment
            $comment = factory(App\Comment::class,2)->make();
            $user->comments()->saveMany($comment);   
            //N to N relationship with User
            $follower = factory(App\User::class)->create();
            $user->followers()->attach($follower);            
        });    
    }
}
