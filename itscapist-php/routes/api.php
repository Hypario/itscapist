<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', 'Api\AuthController@login');
Route::post('register', 'Api\PersonneController@store');

Route::post('personnes', 'Api\PersonneController@store');

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('logout', 'Api\AuthController@logout');
    Route::get('me', 'Api\AuthController@me');
    Route::post('refresh', 'Api\AuthController@refresh');
    Route::get('personnes', 'Api\PersonneController@index');
    Route::get('personnes/{id}', 'Api\PersonneController@show');
    Route::put('personnes/{id}', 'Api\PersonneController@update');
    Route::delete('personnes/{id}', 'Api\PersonneController@destroy');
});
