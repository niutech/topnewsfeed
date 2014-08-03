TopNewsFeed
===========

Too much boring content in your Facebook/Twitter/Google+ News Feed? TopNewsFeed helps you find the top posts in the News Feed and Profiles, sorted by likes. No server-side processing involved, no privacy concerns!

Bookmarklet
-----------

GitHub blocks publishing bookmarklets, so you have to add a new bookmark in your bookmarks bar and replace its URL with the following code. Then go to any Facebook/Twitter/Google+/Instagram profile and run it. By clicking the gear icon on the right, you can choose how many News Feed pages will be requested.

    javascript:(function(){var s=document.createElement("script");s.src="https://niutech.github.io/topnewsfeed/topnewsfeed.min.js";document.body.appendChild(s);})()

Due to a [Mozilla bug in CSP](https://bugzilla.mozilla.org/show_bug.cgi?id=866522), the above version does not work in Firefox. Try this code instead:

    javascript:(function(){function g(){clearInterval(k);m();document.body.removeChild(c);return!1}function n(){c=document.createElement("div");var a=document.createElement("div"),b=document.createElement("a"),e=document.createElement("a"),h=document.createElement("h1");d=document.createElement("progress");c.style.cssText="position:fixed;top:0;left:0;bottom:0;right:0;z-index:99999;background-color:rgba(255,255,255,0.7);";a.style.cssText="position:fixed;top:50%;left:50%;width:260px;height:80px;margin-top:-60px;margin-left:-150px;padding:20px;background-color:#fff;border:1px solid;border-color:#e5e6e9 #dfe0e4 #d0d1d5;border-radius:3px;text-align:center;";b.style.cssText="position:fixed;top:30px;right:10px;font-size:60px;text-decoration:none;color:inherit;";e.style.cssText='position:fixed;top:90px;right:10px;font:40px "Segoe UI Symbol","DejaVu Sans",FreeSerif,sans-serif;text-decoration:none;color:inherit;';h.style.cssText="font-size:20px;margin-bottom:20px;";d.style.cssText="width:100%;height:30px;";b.innerHTML="\u00d7";e.innerHTML="\u2699";h.innerHTML="Loading TopNewsFeed";b.onclick=g;e.onclick=p;b.href="#";e.href="#";d.value=0;d.max=f;a.appendChild(h);a.appendChild(d);c.appendChild(a);c.appendChild(b);c.appendChild(e);document.body.appendChild(c)}function p(){d.max=f=localStorage.MAX_PAGES=prompt("Enter the maximum number of requested pages:",f)||f;return!1}function m(){var a=Array.prototype.slice.call(document.querySelectorAll(q));if(a.length){var b=a[0].parentNode;a.sort(function(a,b){var c=a.querySelector(l)||{},d=(b.querySelector(l)||{}).textContent||"0";return(c.textContent||"0").replace(/\D/g,"")-d.replace(/\D/g,"")});for(var c in a)b.insertBefore(a[c],b.firstChild)}}var f=localStorage.MAX_PAGES||5,q='[data-cursor],._2d10,._4_7u .fbTimelineUnit,[data-component-term="tweet"],.photo-feed .photo,.Xa',l='[data-reactid$="$like.1"],.UFILikeSentenceText,[data-reactid$="$like.0.1"],.ProfileTweet-action--favorite .ProfileTweet-actionCountForAria,.stat-likes,.H3',c,d,k;(function(){var a=0;n();k=setInterval(function(){if(a++<f){var b=document.querySelector("._5usd,._5t6j .uiMorePagerPrimary,._4_7u .uiMorePagerPrimary,.GridTimeline-retry,.more-photos-enabled,.L5");b?(b.click(),d.value++):g()}else g()},2E3)})()})()


Note: Does not work in Twitter Search due to a lack of favorite count in posts, but it works in Twitter Profiles.
