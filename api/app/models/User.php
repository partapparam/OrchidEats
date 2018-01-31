<?php

namespace OrchidEats\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;


class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'is_chef', 'stripe_user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Set password with hash.
     *
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Relationship with `password_resets` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function passwordReset()
    {
        return $this->hasMany(PasswordReset::class);
    }
    /**
     * Relationship with `profiles` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function profile()
    {
        return $this->hasOne('OrchidEats\Models\Profile', 'profiles_user_id', 'id');
    }

    /**
     * Relationship with `orders` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany('OrchidEats\Models\Orders', 'orders_user_id', 'id');
    }

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();
        static::created(function($model)
        {
            $profile = new Profile;
            $profile->profiles_user_id = $model->id;
            $profile->save();
        });
    }
}
