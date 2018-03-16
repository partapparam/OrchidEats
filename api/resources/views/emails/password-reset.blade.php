@component('mail::message')
Hi {{ $user->first_name }},

We have received a request to reset your password for your Orchid Eats account. Click the link below to reset it.
@component('mail::button', ['url' => $user->url])
Reset Password
@endcomponent
If you did not request a password request, please ignore this email & change your password from your Orchid Eats' account.

Thanks,<br>
{{ config('app.name') }}
@endcomponent