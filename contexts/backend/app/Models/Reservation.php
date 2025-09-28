<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_phone',
        'customer_email',
        'seat_id',
        'reservation_date',
        'start_time',
        'end_time',
        'party_size',
        'special_requests',
        'status',
        'deposit_amount',
        'deposit_paid',
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'deposit_paid' => 'boolean',
        'deposit_amount' => 'decimal:2',
    ];

    public function seat(): BelongsTo
    {
        return $this->belongsTo(Seat::class);
    }
}
