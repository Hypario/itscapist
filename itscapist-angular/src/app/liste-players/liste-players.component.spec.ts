import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlayersComponent } from './liste-players.component';

describe('ListePlayersComponent', () => {
  let component: ListePlayersComponent;
  let fixture: ComponentFixture<ListePlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
