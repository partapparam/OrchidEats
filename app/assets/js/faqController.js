'use strict';

angular.module('OrchidApp')
    .controller('FaqController', function ($scope) {
        var vm = this;
        vm.oneAtATime = false;

        vm.groups = [
            {
                title: 'What is Orchid Eats?',
                content: 'We give independent chefs the tools they need to share their creations with the community, manage and grow their business, and focus on doing what they love. \n'
            },
            {
                title: 'What is the Chef Directory?',
                content: 'Orchid Eats verified chefs are listed in the directory and their profile will be accessible to everyone. Users will have access to chef profiles, photo galleries, and reviews. Users can also request to be added to the chef\'s email list. Unverified chefs are not listed in the directory, and are required to share their VIP link for clients to gain access to their profile.  \n'
            },
            {
            title: 'How do I become verified?',
                content: 'To become a verified chef, you must obtain a State Food Handlers certification. Information on Food Handlers certification can also be found on your Account Status page. \n' +
                    'If you have any questions, please email param@orchideats.com \n'
            },
            {
                title: 'How does it work?\n',
                content: 'Super simple. Search the directory for a chef that fits your tastes and convenience. When you place an order, all the details will be included in your account dashboard, like whether you need to go pickup the meals or it will arrive at your doorstep, if you had any special request, and how to contact the chef if you have any questions. \n'
            },
            // {
            //     title: 'How are Orchid Eats Chefs vetted?\n',
            //     content: 'All verified Orchid chefs have completed a home tour and passed a kitchen inspection. We require a copy of a Food Handler Card for their state. \n'
            // },
            {
                title: 'How do I pay?\n',
                content: 'You pay online using your credit or debit card. We use Stripe as our secure transaction provider and your information is always protected.\n' +
                    'Stripe is a third-party payments processor built around a simple idea: make it easy to do business online. Stripe is the best way to accept payments online and aims to expand internet commerce by making it easy to process transactions and manage an online business. \n' +
                    'Stripe now processes billions of dollars a year for thousands of businesses, from newly-launched start-ups to Fortune 500 companies. \n'
            },
            {
                title: 'What is a food handler’s card and why do I need one?\n',
                content: 'If you prepare, store or serve food, you must obtain Food Handler Card within 30 days of starting your operation. If you already have a “Food protection manager certification”, you don’t need a California Food Handler Card. An up to date copy of your Food Handler Card or other qualifying certifications must be uploaded to Orchid Eats for accurate and current record keeping purposes.\n'
            },
            {
                title: 'Is my privacy protected as an Orchid Eats chef?\n',
                content: 'We take privacy and security very seriously, and are committed to providing a safe experience for all users on our platform.  Personal contact information for chefs is never shared publicly, and only available to their clients.\n'
            },
            {
                title: 'Where do you currently operate?\n',
                content: 'Our major location is in Los Angeles, CA. We’ll be expanding soon!\n'
            },
            {
                title: 'How much do Orchid meals cost?\n',
                content: 'Chef set their own prices based on ingredient costs and labor. Prices will vary by region and by type of cuisine, but most meals are in the $7-$15 range.\n'
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
                content: 'If you need to cancel or change an order, please contact the chef first. If that is unsuccessful, let us know ASAP by emailing param@orchideats.com. Please keep in mind, our chefs are small-scale producers, and any cancellations affect how they are able serve you and the community. Problems with your meal? Please notify us within 5 business days, and we’ll consider meal credit refund on a case-by-case basis.\n'
            },
            {
                title: 'Do you deliver?\n',
                content: 'Delivery is dependent on the chef. Some will choose to offer delivery while others may require you to pickup your order. \n'
            },
            {
                title: 'How can I hear about upcoming meals?\n',
                content: 'Once you’re a member of the community, a newsletter with upcoming meals will be delivered to your inbox. You can also join a chef\'s email list and be notified each week when they update their menus. \n'
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