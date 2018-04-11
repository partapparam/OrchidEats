@component('mail::message')
Hi {{$data['buyer']}},

Your order has been confirmed. The order summary is below.

@component('mail::panel')
Chef Contact Information:<br>
Email: {{$data['email']}}<br>
Phone: {{$data['phone']}}<br><br>
{{$data['order']['method']}} Details: {{$data['order']['details']}}<br><br>
{{$data['order']['method']}} Date: {{$data['order']['date']}}<br><br>
Order Total: ${{$data['total']}}<br><br>
Order Summary:<br>
@foreach ($data['meals'] as $ea)
{{$ea['name']}}<br>Quantity: {{$ea['quantity']}}<br><br>
@endforeach

@endcomponent

If you have any questions,please contact the chef directly. If unsuccessful, please email param@orchideats.com.


Cheers,<br>
{{ config('app.name') }}
@endcomponent
