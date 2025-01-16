import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo with the correct src', () => {
    const logoImg = fixture.debugElement.query(By.css('.logo'));
    expect(logoImg).toBeTruthy();
    expect(logoImg.nativeElement.getAttribute('src')).toBe('assets/cocagne-vert.png');
  });

  it('should display the page title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent.trim()).toBe('Jardin de Cocagne');
  });
});
