import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-annoucecontent',
  templateUrl: './annoucecontent.component.html',
  styleUrls: ['./annoucecontent.component.scss'],
})
export class AnnoucecontentComponent implements OnInit, OnDestroy {

  annouceContent: any
  content: string
  progression: number = -1

  constructor( private contentService: ContentService,
    private router: Router,
    private navController: NavController) {
      this.annouceContent = this.router.getCurrentNavigation().extras.state.annouce
    }

  async ngOnInit() {
    this.content = await this.contentService.getAnnouceContent(this.annouceContent.id)
    console.log(this.content)
  }

  ngOnDestroy() {}

  public back() {
    this.navController.pop()
  }

}