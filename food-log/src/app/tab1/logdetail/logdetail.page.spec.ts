import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogdetailPage } from './logdetail.page';

describe('LogdetailPage', () => {
  let component: LogdetailPage;
  let fixture: ComponentFixture<LogdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
