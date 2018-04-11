@component('mail::message')
Hi, {{$data['name']}},

{{$data['chef']}} has confirmed completion of your order. <br>

Order Number: {{$data['order_id']}}<br>

Don't forget to leave a review and give {{$data['chef']}} feedback!

@component('mail::button', ['url' => $data['url']])
Leave A Review
@endcomponent

If there is an issue, please contact the chef directly at {{$data['contact']}}. If this is unsuccessful, please reach out to us.

Cheers,<br>
{{ config('app.name') }}
@endcomponent
