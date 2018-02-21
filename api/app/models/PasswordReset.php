<?php
namespace OrchidEats\Models;
use Illuminate\Database\Eloquent\Model;
class PasswordReset extends Model
{
    protected $fillable = ['email', 'token', 'expiry'];

    /**
     * Relationship with `users` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
