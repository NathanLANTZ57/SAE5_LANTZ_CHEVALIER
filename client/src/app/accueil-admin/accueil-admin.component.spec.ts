import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccueilAdminComponent } from './accueil-admin.component';
import { By } from '@angular/platform-browser';

describe('AccueilAdminComponent', () => {
  let component: AccueilAdminComponent;
  let fixture: ComponentFixture<AccueilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section for inscriptions', () => {
    const inscriptionSection = fixture.debugElement.query(By.css('.InscriptionAdmin'));
    expect(inscriptionSection).toBeTruthy();
    expect(inscriptionSection.nativeElement.querySelector('h2').textContent).toContain('Les inscriptions en attente');
  });

  it('should render the section for payments', () => {
    const paymentSection = fixture.debugElement.query(By.css('.PaiementAdmin'));
    expect(paymentSection).toBeTruthy();
    expect(paymentSection.nativeElement.querySelector('h2').textContent).toContain('Les paiements en attente');
  });

  it('should display the correct number of rows in inscriptions table', () => {
    const rows = fixture.debugElement.queryAll(By.css('.InscriptionAdmin table tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should display the correct number of rows in payments table', () => {
    const rows = fixture.debugElement.queryAll(By.css('.PaiementAdmin table tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should display the correct data for inscriptions', () => {
    const firstRow = fixture.debugElement.query(By.css('.InscriptionAdmin table tbody tr:first-child'));
    expect(firstRow.nativeElement.textContent).toContain('Jean Dupont');
    expect(firstRow.nativeElement.textContent).toContain('jean.dupont');
    expect(firstRow.nativeElement.textContent).toContain('10/01/2025');
    expect(firstRow.nativeElement.textContent).toContain('En attente');
  });

  it('should display the correct data for payments', () => {
    const firstRow = fixture.debugElement.query(By.css('.PaiementAdmin table tbody tr:first-child'));
    expect(firstRow.nativeElement.textContent).toContain('Jean Dupont');
    expect(firstRow.nativeElement.textContent).toContain('50 €');
    expect(firstRow.nativeElement.textContent).toContain('10/01/2025');
    expect(firstRow.nativeElement.textContent).toContain('En attente');
  });
});