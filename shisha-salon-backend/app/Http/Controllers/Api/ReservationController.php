<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    public function index(): JsonResponse
    {
        $reservations = Reservation::with('seat')->get();
        return response()->json($reservations);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'nullable|email|max:255',
            'seat_id' => 'required|exists:seats,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'party_size' => 'required|integer|min:1|max:10',
            'special_requests' => 'nullable|string|max:1000',
            'deposit_amount' => 'nullable|numeric|min:0',
        ]);

        $reservation = Reservation::create($validated);
        $reservation->load('seat');

        return response()->json($reservation, 201);
    }

    public function show(Reservation $reservation): JsonResponse
    {
        $reservation->load('seat');
        return response()->json($reservation);
    }

    public function update(Request $request, Reservation $reservation): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'sometimes|string|max:255',
            'customer_phone' => 'sometimes|string|max:20',
            'customer_email' => 'nullable|email|max:255',
            'seat_id' => 'sometimes|exists:seats,id',
            'reservation_date' => 'sometimes|date|after_or_equal:today',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i|after:start_time',
            'party_size' => 'sometimes|integer|min:1|max:10',
            'special_requests' => 'nullable|string|max:1000',
            'status' => ['sometimes', Rule::in(['pending', 'confirmed', 'cancelled', 'completed'])],
            'deposit_amount' => 'nullable|numeric|min:0',
            'deposit_paid' => 'sometimes|boolean',
        ]);

        $reservation->update($validated);
        $reservation->load('seat');

        return response()->json($reservation);
    }

    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
