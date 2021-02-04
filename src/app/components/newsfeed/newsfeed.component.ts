import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ContentService } from '../../services/content.service'
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent implements OnInit, OnDestroy, OnChanges {

  feeds: any

  constructor(private contentService: ContentService,
    private userService: UserService,
    private navController: NavController) {
      console.log('Newsfeed')
    }

  ngOnInit() {
    this.feeds = this.userService.user.pipe(switchMap(userInfo => this.contentService.getSavedContent(userInfo.uid)))
  }

  ngOnChanges() {

  }

  ngOnDestroy() {

  }

  openNews(feed) {
    this.navController.navigateForward('/tabs/news/' + feed.id, {state: {content: feed}})
  }

  deleteSavedContent(feed) {
    this.userService.removeSavedNews(feed)
  }

}
