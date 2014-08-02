TopNewsFeed
===========

Too much boring content in your Facebook/Twitter/Google+ News Feed? TopNewsFeed helps you find the top posts in the News Feed and Profiles, sorted by likes. No server-side processing involved, no privacy concerns!

Bookmarklet
-----------

GitHub blocks publishing bookmarklets, so you have to add a new bookmark in your bookmarks bar and replace its URL with the following code. Then go to any Facebook/Twitter/Google+/Instagram profile and run it. By clicking the gear icon on the right, you can choose how many News Feed pages will be requested.

    javascript:(function(){var s=document.createElement("script");s.src='https://niutech.github.io/topnewsfeed/topnewsfeed.min.js';document.body.appendChild(s);})()

Note: May not work in Firefox due to a [Mozilla bug in CSP](https://bugzilla.mozilla.org/show_bug.cgi?id=866522). Does not work in Twitter Search due to a lack of favorite count in posts, but it works in Twitter Profiles.
