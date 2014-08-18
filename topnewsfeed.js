(function() {
    
    var MAX_PAGES = localStorage.MAX_PAGES || 5;
    var INTERVAL = 2000;
    var ITEM_SELECTOR = '[data-cursor],' +                 //Facebook News Feed
                        '._2d10,' +                        //Facebook Fanpage
                        '._4_7u .fbTimelineUnit,' +        //Facebook Profile
                        '[data-component-term="tweet"],' + //Twitter Profile
                        '.photo-feed .photo,' +            //Instagram Profile
                        '.Xa';                             //Google+ Profile
    var RANK_SELECTOR = '[data-reactid$="$like.1"],' + 
                        '.UFILikeSentenceText,' + 
                        '[data-reactid$="$like.0.1"],' + 
                        '.ProfileTweet-action--favorite .ProfileTweet-actionCountForAria,' + 
                        '.stat-likes,' + 
                        '.H3';
    var MORE_SELECTOR = '._5usd,' + 
                        '._5t6j .uiMorePagerPrimary,' + 
                        '._4_7u .uiMorePagerPrimary,' + 
                        '.GridTimeline-retry,' + 
                        '.more-photos-enabled,' + 
                        '.L5';
    var overlay;
    var progress;
    var timer;
    
    //Twitter overrides console.log
    console.log = console.__proto__.log;
    
    function closeModal() {
        //stop requesting and process what we already have
        clearInterval(timer);
        processItems();
        document.body.removeChild(overlay);
        return false;
    }
    
    function showModal() {
        //overlay has: close, settings and modal, which has: header and progress
        overlay = document.createElement('div');
        var modal = document.createElement('div');
        var close = document.createElement('a');
        var settings = document.createElement('a');
        var header = document.createElement('a');
        progress = document.createElement('progress');
        //styles
        overlay.style.cssText = 'position:fixed;top:0;left:0;bottom:0;right:0;z-index:99999;background-color:rgba(255,255,255,0.7);';
        modal.style.cssText = 'position:fixed;top:50%;left:50%;width:260px;height:80px;margin-top:-60px;margin-left:-150px;padding:20px;background-color:#fff;border:1px solid;border-color:#e5e6e9 #dfe0e4 #d0d1d5;border-radius:3px;text-align:center;';
        close.style.cssText = 'position:fixed;top:30px;right:10px;font-size:60px;text-decoration:none;color:inherit;';
        settings.style.cssText = 'position:fixed;top:90px;right:10px;font:35px Webdings;text-decoration:none;color:inherit;';
        header.style.cssText = 'font-size:20px;text-decoration:none;color:inherit;'
        progress.style.cssText = 'width:100%;height:20px;margin-top:25px;';
        //contents
        close.innerHTML = '×';
        settings.innerHTML = '';
        header.innerHTML = 'Loading Top News Feed';
        //handlers
        close.onclick = closeModal;
        settings.onclick = showSettings;
        //attributes
        close.href = '#';
        settings.href = '#';
        header.href = 'https://niutech.github.io/topnewsfeed/';
        header.target = '_blank';
        progress.value = 0;
        progress.max = MAX_PAGES;
        //join them all
        modal.appendChild(header);
        modal.appendChild(progress);
        overlay.appendChild(modal);
        overlay.appendChild(close);
        overlay.appendChild(settings);
        document.body.appendChild(overlay);
    }
    
    function showSettings() {
        //save max no. of pages to localStorage and update progress bar and counter
        progress.max = MAX_PAGES = localStorage.MAX_PAGES = prompt('Enter the maximum number of requested pages:', MAX_PAGES) || MAX_PAGES;
        return false;
    }
    
    function loadMore() {
        //load more pages by invoking a click on Show More button, otherwise close modal
        var more = document.querySelector(MORE_SELECTOR);
        if (!more)
            return closeModal();
        more.click();
        progress.value++;
    }
    
    function processItems() {
        //get all posts and rearrange them, return early if no posts
        var items = Array.prototype.slice.call(document.querySelectorAll(ITEM_SELECTOR));
        if (!items.length)
            return;
        var parent = items[0].parentNode;
        items.sort(function(a, b) {
            //compare just digits
            var ranka = a.querySelector(RANK_SELECTOR) || {};
            var rankb = b.querySelector(RANK_SELECTOR) || {};
            var texta = ranka.textContent || '0';
            var textb = rankb.textContent || '0';
            return texta.replace(/\D/g, '') - textb.replace(/\D/g, '');
        });
        for (var i in items) {
            //prepend items on top and log ranks
            parent.insertBefore(items[i], parent.firstChild);
            console.log((items[i].querySelector(RANK_SELECTOR)||{}).textContent);
        }
    }
    
    function init() {
        var i = 0;
        showModal();
        timer = setInterval(function() {
            i++ < MAX_PAGES ? loadMore() : closeModal();
        }, INTERVAL);
    }
    
    init();

})();
