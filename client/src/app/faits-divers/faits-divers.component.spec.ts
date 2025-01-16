import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaitsDiversComponent } from './faits-divers.component';
import { By } from '@angular/platform-browser';
import { LogoComponent } from '../logo/logo.component';

describe('FaitsDiversComponent', () => {
  let component: FaitsDiversComponent;
  let fixture: ComponentFixture<FaitsDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaitsDiversComponent, LogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaitsDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title Qui sommes nous ?', () => {
    const titleElement = fixture.debugElement.query(By.css('.titre p'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Qui sommes nous ?');
  });

  it('should render all explanation sections', () => {
    const explanationSections = fixture.debugElement.queryAll(By.css('.explication .partie_1, .explication .partie_2, .explication .partie_3, .explication .partie_4, .explication .partie_5'));
    expect(explanationSections.length).toBe(5);
  });

  it('should render the download flyer link', () => {
    const flyerLink = fixture.debugElement.query(By.css('.partie_5 .telecharger'));
    expect(flyerLink).toBeTruthy();
    expect(flyerLink.nativeElement.getAttribute('href')).toBe('./assets/fichierflyer1.png');
  });

  it('should render the header image', () => {
    const headerImage = fixture.debugElement.query(By.css('.imgEnTete img'));
    expect(headerImage).toBeTruthy();
    expect(headerImage.nativeElement.getAttribute('src')).toBe('assets/image_info.jpg');
  });
});
