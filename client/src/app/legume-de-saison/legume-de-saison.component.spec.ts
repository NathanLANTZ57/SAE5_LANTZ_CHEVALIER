import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LegumeDeSaisonComponent } from './legume-de-saison.component';
import { LogoComponent } from '../logo/logo.component';

describe('LegumeDeSaisonComponent', () => {
  let component: LegumeDeSaisonComponent;
  let fixture: ComponentFixture<LegumeDeSaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegumeDeSaisonComponent, LogoComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegumeDeSaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table of vegetables correctly', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('should display all vegetables with images and names', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach(row => {
      const cells = row.queryAll(By.css('td'));
      cells.forEach(cell => {
        const img = cell.query(By.css('img'));
        const text = cell.nativeElement.textContent.trim();

        expect(img).toBeTruthy();
        expect(text).not.toBe('');
      });
    });
  });

  it('should apply styles correctly to table cells', () => {
    const tableCells = fixture.debugElement.queryAll(By.css('td'));

    tableCells.forEach(cell => {
      const styles = getComputedStyle(cell.nativeElement);
      expect(styles.padding).toBe('12px');
    });
  });

  it('should display all vegetables with images and names', () => {
    component.legumes = [{ categorie: 'Racine', nom: 'Carotte', quantite: 50 }];
    fixture.detectChanges();
   });  
});
