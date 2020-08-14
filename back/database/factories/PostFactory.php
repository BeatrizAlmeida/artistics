<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'category' => 'fotografia',
        'image' => $faker->imageUrl( $width = 500, $height = 500),
        'user_id'=> factory('App\User')->create()->id,
    ];
});
