<?php

use App\Controllers\BlogpostsController;
use App\Controllers\AuthController;
use App\Controllers\ChallengesController;
use App\Controllers\CommentsController;
use App\Controllers\ExamplesController;
use App\Controllers\MailsController;
use App\Controllers\TagsController;
use App\Controllers\UploadsController;
use App\Controllers\UserController;
use App\Controllers\WorkoutsController;
use Illuminate\Support\Facades\Route;
use App\Controllers\BmiController;

// guest endpoints
Route::get('/blogpost', [BlogpostsController::class, 'index']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/tags', [TagsController::class, 'index']);
Route::get('/challenges', [ChallengesController::class, 'index']);
Route::post('/user', [UserController::class, 'create']);
Route::post('/auth/verify', [UserController::class, 'verifyEmail']);

// user endpoints
Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/auth/logout', [AuthController::class, 'logout']);

  Route::get('/user', [UserController::class, 'show']);
  Route::patch('/user', [UserController::class, 'update']);
  Route::delete('/user', [UserController::class, 'destroy']);




  Route::get('/user/challenges', [UserController::class, 'showChallenges']);


  Route::post('/challenges', [ChallengesController::class, 'create']);
  Route::patch('/challenges/{id}', [ChallengesController::class, 'updateChallenge']);
  Route::delete('/challenges/{id}', [ChallengesController::class, 'destroy']);



  Route::get('/uploads', [UploadsController::class, 'index']);
  Route::post('/uploads', [UploadsController::class, 'create']);
  Route::delete('/uploads/{id}', [UploadsController::class, 'destroy']);

  Route::post('/mails/send', [MailsController::class, 'send']);


  Route::get('/workouts', [WorkoutsController::class, 'index']);
  Route::post('/workouts', [WorkoutsController::class, 'create']);
  Route::patch('/workouts', [WorkoutsController::class, 'update']);
  Route::delete('/workouts', [WorkoutsController::class, 'destroy']);

  Route::get('/bmi', [BmiController::class, 'index']);
  Route::patch('/bmi', [BmiController::class, 'update']);
  Route::delete('/bmi', [BmiController::class, 'destroy']);
  Route::get('/bmi/history', [BmiController::class, 'history']);
});
