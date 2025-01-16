import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FruitDeSaisonComponent } from './fruit-de-saison.component';
import { LogoComponent } from '../logo/logo.component';


describe('FruitDeSaisonComponent', () => {
  let component: FruitDeSaisonComponent;
  let fixture: ComponentFixture<FruitDeSaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitDeSaisonComponent, LogoComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitDeSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const title = fixture.debugElement.query(By.css('.titre p')).nativeElement.textContent;
    expect(title).toContain('Les fruits du mois');
  });

  it('should render the table with fruit data', () => {
    const table = fixture.debugElement.query(By.css('.tableau table'));
    expect(table).toBeTruthy();

    const rows = table.queryAll(By.css('tr'));
    expect(rows.length).toBeGreaterThan(1); // At least one header and some data rows
  });

  it('should render images with alt attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('td img'));
    images.forEach((img) => {
      expect(img.nativeElement.alt).toBeTruthy();
    });
  });
});
