<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $table = 'receipt';

    protected $fillable = [
        'user_id',
        'category',
        'sum',
        'date',
        'image'
    ];

    protected $hidden = [
        'user_id'
    ];

    public $timestamps = false;
}
