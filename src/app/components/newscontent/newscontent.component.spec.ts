import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewscontentComponent } from './newscontent.component';

describe('NewscontentComponent', () => {
  let component: NewscontentComponent;
  let fixture: ComponentFixture<NewscontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscontentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewscontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
