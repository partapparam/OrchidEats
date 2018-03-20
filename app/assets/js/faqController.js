'use strict';

angular.module('OrchidApp')
    .controller('FaqController', function ($scope) {
        var vm = this;
        vm.oneAtATime = false;

        vm.groups = [
            {
                title: 'What is Orchid Eats?',
                content: 'We give talented home cooks the ability to share their food with the community, and the opportunity for hungry neighbors to eat healthy, homemade meals without having to spend time in the kitchen. \n'
            },
            {
                title: 'How does it work?\n',
                content: 'Super simple. Join the community, browse our selection of home cooked meals, and place your order online. All the details will be included in your order, like whether you need to go pickup the meals or it will arrive at your doorstep. \n'
            },
            {
                title: 'How are Orchid Eats Chef vetted?\n',
                content: 'All verified Orchid chefs have completed a home tour and passed a kitchen inspection. We require a copy of a Food Handler Card for their state before they cook their first meal. Many of our cooks are parents themselves too; the safety of their family (and yours) is always number one. To learn more about our requirements for becoming a Chef, see Trust and Safety.\n'
            },
            {
                title: 'How do I pay?\n',
                content: 'You pay online using your credit or debit card. We use Stripe as our secure transaction provider and your information is always protected.\n'
            },
            {
                title: 'What is a food handler’s card and why do I need one?\n',
                content: 'If you prepare, store or serve food, you must obtain Food Handler Card within 30 days of starting your operation. If you already have a “Food protection manager certification”, you don’t need a California Food Handler Card. An up to date copy of your Food Handler Card or other qualifying certifications must be uploaded to Orchid Eats for accurate and current record keeping purposes.\n'
            },
            {
                title: 'How are Orchid Eats Chef vetted?\n',
                content: 'All verified Orchid chefs have completed a home tour and passed a kitchen inspection. We require a copy of a Food Handler Card for their state before they cook their first meal. Many of our cooks are parents themselves too; the safety of their family (and yours) is always number one. To learn more about our requirements for becoming a Chef, see Trust and Safety.\n'
            },
            {
                title: 'Is my privacy protected as an Orchid Eats chef?\n',
                content: 'We take privacy and security very seriously, and are committed to providing a safe experience for all users on our platform.  Personal contact info for chefs is never shared publicly, and all SMS and email communication is routed through the platform.\n'
            },
            {
                title: 'Where do you currently operate?\n',
                content: 'Our major location is in Los Angeles, CA. We’ll be expanding soon!\n'
            },
            {
                title: 'How much do Orchid meals cost?\n',
                content: 'Chef set their own prices based on ingredient costs and labor. Prices will vary by region and by type of cuisine, but most meals are in the $7-$14 range.\n'
            },
            {
                title: 'How many people does each meal feed?\n',
                content: 'Most meals are designed to feed one person with a hearty appetite, and lots of folks find that they have a bit leftover. You can find meals that fit your cravings, nutritional goals, and appetite. As always, just send the chef a quick message if there’s anything you’d like to clarify ahead of time.\n'
            },
            {
                title: 'Is the food served ready to eat?\n',
                content: 'Yes, all meals are fully-prepared. Chef will include reheating instructions for you to make healthy eating effortless. \n'
            },
            {
                title: 'What is your refund policy?\n',
                content: 'If you need to cancel or change an order, please let us know ASAP by replying to your order confirmation email or emailing param@orchideats.com. Order cancelled 48 hours in advance will receive a full refund. Otherwise, order cancellations will be refunded via Orchid Eats meal credit. Please keep in mind, our chefs are small-scale producers, and any cancellations affect how they are able serve you and the community. Problems with your meal? Please notify us within 5 business days, and we’ll consider meal credit refund on a case-by-case basis.\n'
            },
            {
                title: 'Do you deliver?\n',
                content: 'Delivery is dependent on the chef. Some will choose to offer delivery while others may require you to pickup your order. \n'
            },
            {
                title: 'How can I hear about upcoming meals?\n',
                content: 'Once you’re a member of the community, a newsletter with upcoming meals will be delivered to your inbox. You can also follow chef profiles and be notified each week when they update their menus. \n'
            },
            {
                title: 'I\'m having issues with the website.\n',
                content: 'Sorry to hear! Send us an email at param@orchideats.com.\n'
            },
            {
                title: 'I\'m a writer. I\'d like to write about you!\n',
                content: 'Great! Send us an email at param@orchideats.com.\n'
            }
        ];
    });