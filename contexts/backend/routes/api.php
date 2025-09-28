<?php

use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\SeatController;
use Illuminate\Support\Facades\Route;

Route::get('seats/available', [SeatController::class, 'available']);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('seats', SeatController::class);