import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendrierLivraisonComponent } from './calendrier-livraison.component';
import { By } from '@angular/platform-browser';

describe('CalendrierLivraisonComponent', () => {
  let component: CalendrierLivraisonComponent;
  let fixture: ComponentFixture<CalendrierLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierLivraisonComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calendar header with correct year and month', () => {
    const header = fixture.debugElement.query(By.css('.header'));
    expect(header).toBeTruthy();
  
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' })
      .format(new Date());
  
    expect(header.nativeElement.textContent).toContain(currentYear);
    expect(header.nativeElement.textContent.toLowerCase()).toContain(currentMonth);
  });
  

  it('should render the correct number of days in the month', () => {
    const days = fixture.debugElement.queryAll(By.css('.days-grid .day'));
    expect(days.length).toBe(component.daysInMonth.length);
  });
  

  it('should highlight today\'s date', () => {
    const today = new Date();
    const todayElement = fixture.debugElement.query(By.css('.day.today'));
  
    if (component.currentDate.getMonth() === today.getMonth() && 
        component.currentDate.getFullYear() === today.getFullYear()) {
      expect(todayElement.nativeElement.textContent.trim()).toBe(today.getDate().toString());
    } else {
      expect(todayElement).toBeNull();
    }
  });
  

  it('should open the modal with correct data when a day is clicked', () => {
    const dayElement = fixture.debugElement.query(By.css('.day'));
    dayElement.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    expect(component.isModalOpen).toBeTrue();
    expect(component.selectedDay).toBe(Number(dayElement.nativeElement.textContent.trim()));
  });
  

  it('should close the modal when closeModal is called', () => {
    component.isModalOpen = true;
    component.closeModal();
    fixture.detectChanges();
  
    expect(component.isModalOpen).toBeFalse();
    expect(component.selectedDay).toBeNull();
  });
  

  it('should correctly display activity details for specific days', () => {
    const day = 1;
    component.openModal(day);
    fixture.detectChanges();

    const modalContent = fixture.debugElement.query(By.css('.modal-content'));
    expect(modalContent.nativeElement.textContent).toContain('Quel est l\'activité du jour ?');

    const mondayActivities = modalContent.nativeElement.querySelector('.activity-details');
    if (component.selectedDayLabel.startsWith('Lundi') || component.selectedDayLabel.startsWith('Mercredi')) {
      expect(mondayActivities).toBeTruthy();
      expect(mondayActivities.textContent).toContain('préparation des commandes');
    }
  });
});
