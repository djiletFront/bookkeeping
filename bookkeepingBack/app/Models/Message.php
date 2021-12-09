<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'message';

    protected $fillable = [
        'user_id',
        'text'
    ];

    protected $hidden = [
        'user_id'
    ];

    public $timestamps = false;
}