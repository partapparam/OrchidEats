<?php
namespace OrchidEats\Models;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
class User extends Authenticatable
{
    use Notifiable;
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'is_chef', 'stripe_user_id', 'is_admin', 'remember_token', 'approved'
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
    public function profile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Profile::class, 'profiles_user_id', 'id');
    }

    /**
     * Relationship with `chefs` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function chef(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Chef::class, 'chefs_user_id', 'id');
    }

    /**
     * Relationship with `carts` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cart(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Cart::class, 'carts_user_id', 'id');
    }

    /**
     * Relationship with `orders` table.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class, 'orders_user_id', 'id');
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
