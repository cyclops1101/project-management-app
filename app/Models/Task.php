<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\HasImage;

class Task extends Model
{
    use HasFactory;
    use HasImage;

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'status',
        'priority',
        'due_date',
        'project_id',
        'created_by',
        'updated_by',
        'assigned_to',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    // Define relationships
    public function project() : BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater() : BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function assignee() : BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
