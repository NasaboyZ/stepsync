<?php


use App\Controllers\AuthController;
use App\Controllers\ChallengesController;

use App\Controllers\UserController;
use App\Controllers\WorkoutsController;
use Illuminate\Support\Facades\Route;
use App\Controllers\BmiController;
use App\Controllers\ImageController;



Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/challenges', [ChallengesController::class, 'index']);
Route::post('/user', [UserController::class, 'create']);

Route::middleware(['auth:sanctum'])->group(function () {
  Route::post('/auth/logout', [AuthController::class, 'logout']);

  Route::get('/user', [UserController::class, 'show']);
  Route::patch('/user', [UserController::class, 'update']);
  Route::delete('/user', [UserController::class, 'destroy']);




  Route::get('/user/challenges', [UserController::class, 'showChallenges']);


  Route::post('/challenges', [ChallengesController::class, 'create']);
  Route::get('/challenges/statistics', [ChallengesController::class, 'getStatistics']);
  Route::patch('/challenges/{id}', [ChallengesController::class, 'updateChallenge']);
  Route::delete('/challenges/{id}', [ChallengesController::class, 'destroy']);





  Route::get('/workouts', [WorkoutsController::class, 'index']);
  Route::post('/workouts', [WorkoutsController::class, 'create']);
  Route::patch('/workouts', [WorkoutsController::class, 'update']);
  Route::delete('/workouts', [WorkoutsController::class, 'destroy']);
  Route::get('/workouts/statistics', [WorkoutsController::class, 'getStatistics']);

  Route::get('/bmi', [BmiController::class, 'index']);
  Route::patch('/bmi', [BmiController::class, 'update']);
  Route::delete('/bmi', [BmiController::class, 'destroy']);
  Route::get('/bmi/history', [BmiController::class, 'history']);

  Route::get('/avatar', [ImageController::class, 'show']);
  Route::post('/avatar', [ImageController::class, 'store']);
  Route::delete('/avatar', [ImageController::class, 'destroy']);
});
