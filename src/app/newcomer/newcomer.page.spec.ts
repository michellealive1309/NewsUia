import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewcomerPage } from './newcomer.page';

describe('NewcomerPage', () => {
  let component: NewcomerPage;
  let fixture: ComponentFixture<NewcomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcomerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewcomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
