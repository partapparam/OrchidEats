@component('mail::message')
Hi {{$data['buyer']}},

Your order has been confirmed. To see the full details, please sign in to
your Orchid Eats account.
@component('mail::button', ['url' => $data['url']])
View Order Details
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
