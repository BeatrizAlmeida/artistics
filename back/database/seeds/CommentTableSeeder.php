<?php

use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory (App\Comment::class,5)->create()->each(function ($comment){
            //1 to N relationship with Post
            $post = factory(App\Post::class)->make();
            $comment->post()->save($post);
        });
    }
}
