import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepotsComponent } from './depots.component';
import { By } from '@angular/platform-browser';
import { LogoComponent } from '../logo/logo.component';

describe('DepotsComponent', () => {
  let component: DepotsComponent;
  let fixture: ComponentFixture<DepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotsComponent, LogoComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title Les dépôts', () => {
    const titleElement = fixture.debugElement.query(By.css('.titre p'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Les dépôts');
  });

  it('should render the list of depot locations', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.presentationdepots ul li'));
    expect(listItems.length).toBe(12);
    expect(listItems[0].nativeElement.textContent).toContain('Charmes');
    expect(listItems[11].nativeElement.textContent).toContain('Raon-aux-Bois');
  });

  it('should render the file link for depot addresses', () => {
    const linkElement = fixture.debugElement.query(By.css('.text1 a'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.getAttribute('href')).toBe('./assets/fichierdepots.png');
  });

  it('should render the warning about pickup times', () => {
    const warningElement = fixture.debugElement.query(By.css('.text2 p'));
    expect(warningElement).toBeTruthy();
    expect(warningElement.nativeElement.textContent).toContain('il est impératif de respecter les horaires prédéfinis');
  });

  it('should render the image at the bottom', () => {
    const imageElement = fixture.debugElement.query(By.css('.imgbas img'));
    expect(imageElement).toBeTruthy();
    expect(imageElement.nativeElement.getAttribute('src')).toBe('./assets/depotsimage.png');
  });
});
