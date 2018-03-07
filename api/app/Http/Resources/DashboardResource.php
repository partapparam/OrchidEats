<?php
namespace OrchidEats\Http\Resources;
use Illuminate\Http\Resources\Json\Resource;
use Carbon\Carbon;

class DashboardResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        $year = Carbon::now()->year;
        return [
            'chef' => $this->chef,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'feedback' => $this->chef->ratings()
            ->select('chef_feedback', 'ratings_order_id', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get() ?? null,
            'food_handler' => $this->chef->food_handler ?? null,
            'current_orders' => $this->chef->orders()->where('completed', '=', '0')->count(),
            'order_deadline' => $this->chef->order_deadline ?? 0,
            'ordersTotal' => $this->chef->orders()->count() ?? 0,
            'ratingAvg' => $this->chef->ratings()->avg('rating') ?? 0,
            'reviewsTotal' => $this->chef->ratings()->count() ?? 0,
            'yearlyRevenueTotal' => $this->chef->orders()->whereYear('created_at', date("$year"))->sum('order_total'),
            'revenueTotal' => $this->chef->orders()->sum('order_total')
        ];
    }
}