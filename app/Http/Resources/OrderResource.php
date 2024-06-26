<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item_id' => $this->item_id,
            'item_name' => $this->item->name,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            'quantity' => $this->quantity,
            'total_price' => $this->total_price,
            'status' => $this->status,
        ];
    }
}
