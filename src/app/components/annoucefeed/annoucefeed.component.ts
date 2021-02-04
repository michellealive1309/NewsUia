import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { ContentService } from '../../services/content.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-annoucefeed',
  templateUrl: './annoucefeed.component.html',
  styleUrls: ['./annoucefeed.component.scss'],
})
export class AnnoucefeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() group: any

  feeds: Observable<any>

  constructor(private contentService: ContentService,
    private userService: UserService,
    private navController: NavController) { 
    }

  ngOnInit() {
    if (!this.group) {return}
    this.feeds = this.contentService.getContent(this.group).pipe(map(snapshotChanges => {
      return snapshotChanges.map(snapshot => {
        let data = snapshot.payload.doc.data()
        if (data.type === "news") {
          return {
            id: snapshot.payload.doc.id,
            subject: data.subject,
            group: data.group,
            content: data.content,
            type: data.type,
            created: data.created
          }
        }
        else {
          return {
            id: snapshot.payload.doc.id,
            content: data.content,
            group: data.group,
            images: data.images,
            imagesRef: data.imagesRef,
            files: data.files,
            filesRef: data.filesRef,
            type: data.type,
            created: data.created
          }
        }
      })
    }))
  }

  ngOnChanges() {
    this.ngOnInit()
  }

  ngOnDestroy() {
  }

  saveContent(feed: any) {
    this.userService.addSaveContent(feed)
  }

  openNews(feed) {
    this.navController.navigateForward('/tabs/news/' + feed.id, {state: {content: feed}})
  }

}
