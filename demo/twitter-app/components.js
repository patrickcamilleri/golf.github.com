jQuery.golf.components={"Twitter":{"name":"Twitter","html":"<div>\n\n  <style type=\"text/golf\">\n    .component {\n      font-family: sans-serif;\n      position: relative;\n      margin: 0 auto;\n      width: 960px;\n    }\n    .left {\n      float: left;\n      width: 260px;\n    }\n    .right {\n      float: left;\n      width: 700px;\n    }\n    .twitter_component ul {\n      list-style-type: none;\n      border-left: 2px solid #aaa;\n    }\n    .twitter_component ul li {\n      padding: 0.5em;\n    }\n    .twitter_component ul li:even {\n      background: #eee;\n    }\n  <\/style>\n\n  <script type=\"text/golf\">\n    function() {\n      var searched = [], ec = encodeURIComponent, \n          text = $(\"input[name='username']\");\n\n      this.search = function(search) {\n        $(\"form\").submit(function(){\n          $.golf.location(\"/search/\"+ec(text.val())+\"/\");\n          return false;\n        });\n\n        $(\".twitter_component\").empty().tweet({\n          loading_text: \"Loading...\",\n          username: ec(search),\n          count: 30\n        });\n\n        if ($.inArray(search, searched) < 0) {\n          $(\".searched ul\").prepend(\n            \"<li><a href='#/search/\"+ec(search)+\"/'>\"+search+\"<\/a><\/li>\");\n          searched.push(search);\n        }\n\n        document.title = \"Twitter Search | \" + search;\n        text.val(search).select();\n      };\n    }\n  <\/script>\n\n  <div class=\"left\">\n    <h3>Twitter Search<\/h3>\n    <form>\n      <input type=\"text\" name=\"username\" />\n      <input type=\"submit\" value=\"search\" />\n    <\/form>\n\n    <div class=\"searched\">\n      <h4>Previous Searches<\/h4>\n      <ul><\/ul>\n    <\/div>\n  <\/div>\n\n  <div class=\"right\">\n    <h3>Results<\/h3>\n    <div class=\"twitter_component\"><\/div>\n  <\/div>\n\n<\/div>\n"}};jQuery.golf.res={"README.markdown":"README.markdown"};jQuery.golf.plugins={};jQuery.golf.scripts={"jquery.tweet":{"name":"jquery.tweet","js":"(function($) {\n \n  $.fn.tweet = function(o){\n    var s = {\n      username: [\"seaofclouds\"],              // [string]   required, unless you want to display our tweets. :) it can be an array, just do [\"username1\",\"username2\",\"etc\"]\n      avatar_size: null,                      // [integer]  height and width of avatar if displayed (48px max)\n      count: 3,                               // [integer]  how many tweets to display?\n      intro_text: null,                       // [string]   do you want text BEFORE your your tweets?\n      outro_text: null,                       // [string]   do you want text AFTER your tweets?\n      join_text:  null,                       // [string]   optional text in between date and tweet, try setting to \"auto\"\n      auto_join_text_default: \"i said,\",      // [string]   auto text for non verb: \"i said\" bullocks\n      auto_join_text_ed: \"i\",                 // [string]   auto text for past tense: \"i\" surfed\n      auto_join_text_ing: \"i am\",             // [string]   auto tense for present tense: \"i was\" surfing\n      auto_join_text_reply: \"i replied to\",   // [string]   auto tense for replies: \"i replied to\" @someone \"with\"\n      auto_join_text_url: \"i was looking at\", // [string]   auto tense for urls: \"i was looking at\" http:...\n      loading_text: null,                     // [string]   optional loading text, displayed while tweets load\n      query: null                             // [string]   optional search query\n    };\n\n    $.extend($.fn, {\n      linkUrl: function() {\n        var returning = [];\n        var regexp = /((ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?)/gi;\n        this.each(function() {\n          returning.push(this.replace(regexp,\"<a href=\\\"$1\\\">$1<\/a>\"))\n        });\n        return $(returning);\n      },\n      linkUser: function() {\n        var returning = [];\n        var regexp = /[\\@]+([A-Za-z0-9-_]+)/gi;\n        this.each(function() {\n          returning.push(this.replace(regexp,\"<a href=\\\"http://twitter.com/$1\\\">@$1<\/a>\"))\n        });\n        return $(returning);\n      },\n      linkHash: function() {\n        var returning = [];\n        var regexp = / [\\#]+([A-Za-z0-9-_]+)/gi;\n        this.each(function() {\n          returning.push(this.replace(regexp, ' <a href=\"http://search.twitter.com/search?q=&tag=$1&lang=all&from='+s.username.join(\"%2BOR%2B\")+'\">#$1<\/a>'))\n        });\n        return $(returning);\n      },\n      capAwesome: function() {\n        var returning = [];\n        this.each(function() {\n          returning.push(this.replace(/(a|A)wesome/gi, 'AWESOME'))\n        });\n        return $(returning);\n      },\n      capEpic: function() {\n        var returning = [];\n        this.each(function() {\n          returning.push(this.replace(/(e|E)pic/gi, 'EPIC'))\n        });\n        return $(returning);\n      },\n      makeHeart: function() {\n        var returning = [];\n        this.each(function() {\n          returning.push(this.replace(/[&lt;]+[3]/gi, \"<tt class='heart'>&#x2665;<\/tt>\"))\n        });\n        return $(returning);\n      }\n    });\n\n    function relative_time(time_value) {\n      var parsed_date = Date.parse(time_value);\n      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();\n      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);\n      if(delta < 60) {\n      return 'less than a minute ago';\n      } else if(delta < 120) {\n      return 'about a minute ago';\n      } else if(delta < (45*60)) {\n      return (parseInt(delta / 60)).toString() + ' minutes ago';\n      } else if(delta < (90*60)) {\n      return 'about an hour ago';\n      } else if(delta < (24*60*60)) {\n      return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';\n      } else if(delta < (48*60*60)) {\n      return '1 day ago';\n      } else {\n      return (parseInt(delta / 86400)).toString() + ' days ago';\n      }\n    }\n\n    if(o) $.extend(s, o);\n    return this.each(function(){\n      var list = $('<ul class=\"tweet_list\">').appendTo(this);\n      var intro = '<p class=\"tweet_intro\">'+s.intro_text+'<\/p>'\n      var outro = '<p class=\"tweet_outro\">'+s.outro_text+'<\/p>'\n      var loading = $('<p class=\"loading\">'+s.loading_text+'<\/p>');\n      if(typeof(s.username) == \"string\"){\n        s.username = [s.username];\n      }\n      var query = '';\n      if(s.query) {\n        query += 'q='+s.query;\n      }\n      query += '&q='+s.username;\n      var url = 'http://search.twitter.com/search.json?&'+query+'&rpp='+s.count+'&callback=?';\n      if (s.loading_text) $(this).append(loading);\n      $.getJSON(url, function(data){\n        if (s.loading_text) loading.remove();\n        if (s.intro_text) list.before(intro);\n        $.each(data.results, function(i,item){\n          // auto join text based on verb tense and content\n          if (s.join_text == \"auto\") {\n            if (item.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {\n              var join_text = s.auto_join_text_reply;\n            } else if (item.text.match(/(^\\w+:\\/\\/[A-Za-z0-9-_]+\\.[A-Za-z0-9-_:%&\\?\\/.=]+) .*/i)) {\n              var join_text = s.auto_join_text_url;\n            } else if (item.text.match(/^((\\w+ed)|just) .*/im)) {\n              var join_text = s.auto_join_text_ed;\n            } else if (item.text.match(/^(\\w*ing) .*/i)) {\n              var join_text = s.auto_join_text_ing;\n            } else {\n              var join_text = s.auto_join_text_default;\n            }\n          } else {\n            var join_text = s.join_text;\n          };\n\n          var join_template = '<span class=\"tweet_join\"> '+join_text+' <\/span>';\n          var join = ((s.join_text) ? join_template : ' ')\n          var avatar_template = '<a class=\"tweet_avatar\" href=\"http://twitter.com/'+ item.from_user+'\"><img src=\"'+item.profile_image_url+'\" height=\"'+s.avatar_size+'\" width=\"'+s.avatar_size+'\" alt=\"'+item.from_user+'\\'s avatar\" border=\"0\"/><\/a>';\n          var avatar = (s.avatar_size ? avatar_template : '')\n          var date = '<a href=\"http://twitter.com/'+item.from_user+'/statuses/'+item.id+'\" title=\"view tweet on twitter\">'+relative_time(item.created_at)+'<\/a>';\n          var text = '<span class=\"tweet_text\">' +$([item.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+ '<\/span>';\n          \n          // until we create a template option, arrange the items below to alter a tweet's display.\n          list.append('<li>' + avatar + date + join + text + '<\/li>');\n\n          list.children('li:first').addClass('tweet_first');\n          list.children('li:odd').addClass('tweet_even');\n          list.children('li:even').addClass('tweet_odd');\n        });\n        if (s.outro_text) list.after(outro);\n      });\n\n    });\n  };\n})(jQuery);\n"}};jQuery.golf.styles={"jquery.tweet":{"name":"jquery.tweet","css":".tweet { font-family: Georgia, serif; font-size: 120%; color: #085258; } .tweet .tweet_list { -webkit-border-radius: .5em; list-style-type: none; margin: 0; padding: 0; background-color: #8ADEE2; } .tweet .tweet_list li { overflow: auto; padding: .5em; } .tweet .tweet_list li a { color: #0C717A; } .tweet .tweet_list .tweet_even { background-color: #91E5E7; } .tweet .tweet_list .tweet_avatar { padding-right: .5em; float: left; } .tweet .tweet_list .tweet_avatar img { vertical-align: middle; } "},"jquery.tweet.query":{"name":"jquery.tweet.query","css":".query { font-family: Arial, serif; font-size: 90%; color: #085258; } .query .tweet_list { -webkit-border-radius: .5em; list-style-type: none; margin: 0; padding: 0; background-color: #8ADEE2; } .query .tweet_list li { overflow: auto; padding: .5em; } .query .tweet_list li a { color: #0C717A; } .query .tweet_list .tweet_even { background-color: #91E5E7; } .query .tweet_list .tweet_avatar { padding-right: .5em; float: left; } .query .tweet_list .tweet_avatar img { vertical-align: middle; } "},"main":{"name":"main","css":"body { margin:0; padding:0; }  a:link, a:visited{color:#f7941d; text-decoration:none;} a:hover{color:#f7941d; text-decoration:underline;}  .fakelink{color:#f7941d; cursor:pointer;} .fakelink:hover{text-decoration:underline}; "}};jQuery.golf.setupComponents();