import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgSnapshotComponent } from './vg-snapshot.component';

describe('VgSnapshotComponent', () => {
  let component: VgSnapshotComponent;
  let fixture: ComponentFixture<VgSnapshotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VgSnapshotComponent]
    });
    fixture = TestBed.createComponent(VgSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
