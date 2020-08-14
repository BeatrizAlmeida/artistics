<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'text' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'image' => $faker->imageUrl( $width = 500, $height = 500),
        'post_id'=> factory('App\Post')->create()->id,
        'user_id'=> factory('App\User')->make()->id,
    ];
});
