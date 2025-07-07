<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PtkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ptk_id' => $this->id,
            'nuptk' => $this->nuptk,
            'nama' => $this->name,
            'nip' => $this->nip,
            
        ];
    }
}
