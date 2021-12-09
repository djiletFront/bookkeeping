<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';

    protected $fillable = [
        'login',
        'name',
        'email',
        'password',
        'token'
    ];

    protected $hidden = [
        'password', 'token'
    ];

    public $timestamps = false;

    public function receipts()
    {
        return $this->hasMany(Receipt::class, "user_id", "id")->orderBy("date", "DESC")->orderBy("id", "DESC");
    }

    public function messages()
    {
        return $this->hasMany(Message::class, "user_id", "id");
    }
}
