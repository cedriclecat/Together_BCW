/**
 * Created by Brecht on 7/11/2015.
 */
module.exports = {

    'facebookAuth' : {
        'clientID': '321235178000476', // your App ID
        'clientSecret': '52406c7af8e3f37f0709a0a932640589', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey': 'GWRQhrD2X2zS7LYwKA3NlEbly', // your App ID
        'consumerSecret': 'rQU4BaOGiyqAQsVMiNYHpIXUFNmAmEIDSyXFMqhGXTP49dn8cM', // your App Secret
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '977454538857-f6gaa8g732i5i663t3pjdq2uaicicje7.apps.googleusercontent.com',
        'clientSecret'  : '7pk5fe6dQhGHmTjcDjxfqMTA',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};