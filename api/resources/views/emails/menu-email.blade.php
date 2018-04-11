@component('mail::message')
Hi {{ $data['name'] }},

I've updated my menu for this week. Here's what I'll be cooking:

@component('mail::panel')
@foreach ($data['menu'] as $m)
{{$m['name']}}<br><br>
@endforeach

@endcomponent
To place an order, click the button below!
@component('mail::button', ['url' => $data['url']])
Start Your Order
@endcomponent

Thanks,<br>
{{ $data['chef'] }}
@endcomponent
