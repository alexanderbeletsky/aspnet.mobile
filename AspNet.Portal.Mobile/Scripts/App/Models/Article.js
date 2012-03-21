﻿function Article() {

    this.fromData = function(d) {
        this.title = d.Title;
        this.url = decodeURIComponent(d.Link.replace( /\+/g , " "));
        this.urlForMobile = '/readability?url=' + this.url;
        this.date = d.Date;
        this.description = d.Description;
        this.imageUrl = d.ImageUrl;
        this.cached = false;

        return this;
    };

    this.fromCache = function(d) {
        this.title = d.title;
        this.url = d.url;
        this.urlForMobile = '/cache';
        this.date = d.date;
        this.description = d.description;
        this.imageUrl = 'none';
        this.cached = true;

        return this;
    };
    
    this.setRead = function () {
        if (this.cached)
            return;

        var cache = JSON.parse(localStorage.getItem('cache'));

        if (_.isUndefined(cache.articles[this.url])) {
            cache.articles[this.url] = this;
            localStorage.setItem('cache', JSON.stringify(cache));
        }        
    };
};