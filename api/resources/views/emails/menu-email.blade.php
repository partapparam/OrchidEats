@component('mail::message')
Hi {{ $email['name'] }},

I've updated my menu for this week. Please click the button
below to see the menu and place an order!

@component('mail::button', ['url' => $email['url']])
Get Started
@endcomponent

Thanks,<br>
{{ $email['chef'] }}
@endcomponent
