import { Component, OnInit } from '@angular/core';
import { Apiv1Service } from './apiv1.service';

import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private settings: any = {
    columns: {
      icon: {
        title: "アイコン",
        type: "html",
        width: "80px"
      },
      posttime: {
        title: "投稿時間",
        width: "110px"
      },
      // username: {
      //   title: 'ユーザー',
      //   type: "html"
      // },
      text: {
        title: "本文",
        type: "html"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 50
    }
  };

  private tabLabels: string[] = [
    "TimeLine",
    "Mentions",
    "Search"
  ];

  private data: any = [[], [], []];

  private searchTerms: string;

  private fav = "<md-icon>fav</md-icon>";

  constructor(private apiv1: Apiv1Service){
    this.apiv1.getTimeLine()
    .then(res => {
      this.data[0] = this.parse(res);
    });

    this.apiv1.getMentions()
    .then(res => {
      this.data[1] = this.parse(res);
      // console.log(JSON.stringify(res[1], null, 2));
    console.dir(this.data);
    });
  }

  ngOnInit(): void {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    if(!term){
      return;
    }

    this.apiv1.search(term)
      .then(res => {
        this.data[2] = this.parse(res);
      });
  }

  parse(twi: any[]){
    let data = [];
    _.each(twi, t => {
      let icon = t.user.profile_image_url_https;
      icon = this.strToHtmlImage(icon);
      icon = this.strToHtmlLink(icon, "https://twitter.com/" + t.user.screen_name);
      
      let posttime = moment(t.created_at).format("MM/DD HH:mm:ss");

      let screenNameLink = this.strToHtmlLink("@"+t.user.screen_name,
                                        "https://twitter.com/" + t.user.screen_name);

      let text = this.AutoLink(t.text);
      text = this.AutoLinkScreenName(text);

      text = t.user.name  + screenNameLink + "<br/>" + text;
      // text += "<br/><div [innerHtml]='fav'><div>";
      // text += "<app-icon></app-icon>";

      let d = {
        icon: icon,
        posttime: posttime,
        // username: t.user.name  + screenNameLink,
        text: text
      }
      data.push(d);
    });
    return data;
  }

  al(){
    alert("in al()");
    console.log("in al()")
  }

  AutoLink(str) {
    var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
    var regexp_makeLink = function(all, url, h, href) {
        return '<a href="h' + href + '">' + url + '</a>';
    }

    return str.replace(regexp_url, regexp_makeLink);
  }

  AutoLinkScreenName(str) {
    var regexp_url = /(@[a-zA-Z0-9_]{1,15})/;
    var regexp_makeLink = function(all, url, h, href) {
        return '<a href="https://twitter.com/' + url.replace("@", "") + '">' + url + '</a>';
    }

    return str.replace(regexp_url, regexp_makeLink);
  }

  strToHtmlLink(str: string, link: string){
    return `<a href=${link}>` + str + '</a>';
  }

  strToHtmlImage(str: string){
    return `<img src=${str} />`;
  }
}

@Component({
  selector: 'app-icon',
  template: `hello world`,
})
export class IconComponent {

}