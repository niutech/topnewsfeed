(function() {
    
    var MAX_PAGES = localStorage.MAX_PAGES || 5;
    var INTERVAL = 2000;
    var SELECTORS = {
        'facebook.com': {
            item: '[data-fte]',
            rank: '.UFILikeSentence',
            more: '.uiMorePagerPrimary'
        },
        'twitter.com': {
            item: '[data-item-type="tweet"]',
            rank: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForAria'
        },
        'google.com': {
            item: 'c-wiz',
            rank: '[data-count]'
        },
        'vk.com': {
            item: '.post',
            rank: '.post_like_count'
        },
        'soundcloud.com': {
            item: '.soundList__item',
            rank: '.sc-button-like'
        },
        'mixcloud.com': {
            item: '.card',
            rank: '[m-ajax-toggle-type="favorite"]'
        }
    };
    var overlay;
    var progress;
    var timer;
    var hostname;
    
    function closeModal() {
        //stop requesting and process what we already have
        clearInterval(timer);
        processItems();
        document.body.scrollIntoView();
        document.body.removeChild(overlay);
        return false;
    }
    
    function showModal() {
        //modal header
        var header = document.createElement('a');
        header.href = 'https://niutech.github.io/topnewsfeed/';
        header.target = '_blank';
        header.style.cssText = 'font-size:20px;text-decoration:none;color:inherit;';
        header.innerHTML = 'Loading Top News Feed';
        //modal progress bar
        progress = document.createElement('progress');
        progress.value = 0;
        progress.max = MAX_PAGES;
        progress.style.cssText = 'width:100%;height:20px;margin-top:25px;';
        //modal
        var modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:50%;left:50%;width:260px;height:80px;margin-top:-60px;margin-left:-150px;padding:20px;background-color:#fff;border:1px solid;border-color:#e5e6e9 #dfe0e4 #d0d1d5;border-radius:3px;text-align:center;';
        modal.appendChild(header);
        modal.appendChild(progress);
        //close button
        var close = document.createElement('a');
        close.href = '#';
        close.innerHTML = '×';
        close.style.cssText = 'position:fixed;top:30px;right:10px;font-size:60px;text-decoration:none;color:inherit;';
        close.onclick = closeModal;
        //settings button
        var settings = document.createElement('a');
        settings.href = '#';
        settings.innerHTML = '';
        settings.style.cssText = 'position:fixed;top:90px;right:10px;font:35px Webdings;text-decoration:none;color:inherit;';
        settings.onclick = showSettings;
        //overlay
        overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;bottom:0;right:0;z-index:99999;background-color:rgba(255,255,255,0.7);';
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
        //load more pages by scrolling to the bottom of a page
        document.body.scrollIntoView(false);
        progress.value++;
    }
    
    function processItems() {
        //get all posts and rearrange them, return early if no posts
        var items = Array.prototype.slice.call(document.querySelectorAll((SELECTORS[hostname] || {}).item));
        if (!items.length)
            return;
        var parent = items[0].parentNode;
        items.sort(function(a, b) {
            //compare just digits
            var ranka = a.querySelector((SELECTORS[hostname] || {}).rank) || {};
            var rankb = b.querySelector((SELECTORS[hostname] || {}).rank) || {};
            var texta = (ranka.textContent || '0').replace(/(\d+\.\d)k/gi, '$100').replace(/(\d+)k/gi, '$1000').replace(/\D/g, '');
            var textb = (rankb.textContent || '0').replace(/(\d+\.\d)k/gi, '$100').replace(/(\d+)k/gi, '$1000').replace(/\D/g, '');
            return texta - textb;
        });
        for (var i in items) {
            //prepend items on top and log ranks
            parent.insertBefore(items[i], parent.firstChild);
            console.log((items[i].querySelector((SELECTORS[hostname] || {}).rank) || {}).textContent);
        }
    }
    
    function init() {
        var i = 0;
        showModal();
        hostname = location.hostname.split('.').slice(-2).join('.');
        timer = setInterval(function() {
            i++ < MAX_PAGES ? loadMore() : closeModal();
        }, INTERVAL);
    }
    
    init();

})();
