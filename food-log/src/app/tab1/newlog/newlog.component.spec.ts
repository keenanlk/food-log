import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewlogComponent } from './newlog.component';

describe('NewlogComponent', () => {
  let component: NewlogComponent;
  let fixture: ComponentFixture<NewlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
