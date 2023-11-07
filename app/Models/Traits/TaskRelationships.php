<?php

namespace App\Models\Traits;

use App\Models\Status;

trait TaskRelationships
{

    /**
     * The Status of a Tasks
     *
     * @return belongsTo
     */
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
