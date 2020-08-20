import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenPostPage } from './open-post.page';

describe('OpenPostPage', () => {
  let component: OpenPostPage;
  let fixture: ComponentFixture<OpenPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
