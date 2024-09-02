<?php

use App\Controllers\ArticlesController;
use App\Controllers\AuthController;
use App\Controllers\CommentsController;
use App\Controllers\ExamplesController;
use App\Controllers\MailsController;
use App\Controllers\TagsController;
use App\Controllers\UploadsController;
use App\Controllers\UserController;
use App\Controllers\WorkoutsController;
use Illuminate\Support\Facades\Route;

// guest endpoints
Route::get('/articles', [ArticlesController::class, 'index']);
Route::get('/comments', [CommentsController::class, 'index']);
Route::post('/user', [UserController::class, 'create']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/tags', [TagsController::class, 'index']);

// user endpoints
Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/auth/logout', [AuthController::class, 'logout']);

  Route::get('/user', [UserController::class, 'show']);
  Route::patch('/user', [UserController::class, 'update']);
  Route::delete('/user', [UserController::class, 'destroy']);

  Route::post('/articles', [ArticlesController::class, 'create']);
  Route::patch('/articles', [ArticlesController::class, 'update']);
  Route::delete('/articles', [ArticlesController::class, 'destroy']);

  Route::post('/comments', [CommentsController::class, 'create']);
  Route::patch('/comments', [CommentsController::class, 'update']);
  Route::delete('/comments', [CommentsController::class, 'destroy']);

  Route::post('/tags', [TagsController::class, 'create']);
  Route::put('/tags/assign', [TagsController::class, 'assign']);

  Route::post('/uploads', [UploadsController::class, 'create']);
  Route::delete('/uploads', [UploadsController::class, 'destroy']);

  Route::post('/mails/send', [MailsController::class, 'send']);


  Route::get('/workouts', [WorkoutsController::class, 'index']);
  Route::post('/workouts', [WorkoutsController::class, 'create']);
  Route::patch('/workouts/{id}', [WorkoutsController::class, 'update']);
  Route::delete('/workouts/{id}', [WorkoutsController::class, 'destroy']);
});

// example endpoints
Route::get('/examples/ping', [ExamplesController::class, 'ping']);
Route::get('/examples/about', [ExamplesController::class, 'about']);
Route::post('/examples/echo', [ExamplesController::class, 'echo']);
Route::post('/examples/reverse', [ExamplesController::class, 'reverse']);
Route::post('/examples/sum', [ExamplesController::class, 'sum']);
Route::post('/examples/count', [ExamplesController::class, 'count']);
Route::post('/examples/temperature', [ExamplesController::class, 'temperature']);
Route::post('/examples/bmi', [ExamplesController::class, 'bmi']);
