import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersComponent } from './influencers.component';

describe('InfluencersComponent', () => {
  let component: InfluencersComponent;
  let fixture: ComponentFixture<InfluencersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
