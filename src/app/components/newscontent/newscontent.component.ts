import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-newscontent',
  templateUrl: './newscontent.component.html',
  styleUrls: ['./newscontent.component.scss'],
})
export class NewscontentComponent implements OnInit, OnDestroy {

  news: any

  constructor( private router: Router,
    private navController: NavController ) { 
      this.news = this.router.getCurrentNavigation().extras.state.content
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

  back() {
    this.navController.pop()
  }

  

}
