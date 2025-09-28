<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SeatController extends Controller
{
    public function index(): JsonResponse
    {
        $seats = Seat::where('is_active', true)->get();
        return response()->json($seats);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1|max:20',
            'description' => 'nullable|string|max:1000',
            'hourly_rate' => 'required|numeric|min:0',
        ]);

        $seat = Seat::create($validated);
        return response()->json($seat, 201);
    }

    public function show(Seat $seat): JsonResponse
    {
        return response()->json($seat);
    }

    public function update(Request $request, Seat $seat): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:255',
            'capacity' => 'sometimes|integer|min:1|max:20',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'sometimes|boolean',
            'hourly_rate' => 'sometimes|numeric|min:0',
        ]);

        $seat->update($validated);
        return response()->json($seat);
    }

    public function destroy(Seat $seat): JsonResponse
    {
        $seat->delete();
        return response()->json(['message' => 'Seat deleted successfully']);
    }

    public function available(Request $request): JsonResponse
    {
        $date = $request->query('date');
        $startTime = $request->query('start_time');
        $endTime = $request->query('end_time');

        $seats = Seat::where('is_active', true)
            ->whereDoesntHave('reservations', function ($query) use ($date, $startTime, $endTime) {
                $query->where('reservation_date', $date)
                    ->where(function ($q) use ($startTime, $endTime) {
                        $q->whereBetween('start_time', [$startTime, $endTime])
                          ->orWhereBetween('end_time', [$startTime, $endTime])
                          ->orWhere(function ($q2) use ($startTime, $endTime) {
                              $q2->where('start_time', '<=', $startTime)
                                 ->where('end_time', '>=', $endTime);
                          });
                    });
            })
            ->get();

        return response()->json($seats);
    }
}
