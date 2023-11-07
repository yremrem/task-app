<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\TaskRelationships;

class Task extends Model
{
    // use HasFactory;
    use TaskRelationships;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'status_id',
        'user_id'
    ];
}
