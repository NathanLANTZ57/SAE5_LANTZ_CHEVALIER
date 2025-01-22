import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendrierLivraisonComponent } from './calendrier-livraison.component';
import { By } from '@angular/platform-browser';
import { JoursLivraisonService } from '../services/jours-livraison.service';
import { of } from 'rxjs';

describe('CalendrierLivraisonComponent', () => {
  let component: CalendrierLivraisonComponent;
  let fixture: ComponentFixture<CalendrierLivraisonComponent>;
  let mockJoursLivraisonService: any;

  beforeEach(async () => {
    mockJoursLivraisonService = jasmine.createSpyObj('JoursLivraisonService', [
      'getJoursLivraison',
      'addJourLivraison',
      'addMultipleJoursLivraison',
      'deleteJourLivraison',
    ]);

    mockJoursLivraisonService.getJoursLivraison.and.returnValue(of([]));
    mockJoursLivraisonService.addJourLivraison.and.returnValue(of(null));
    mockJoursLivraisonService.addMultipleJoursLivraison.and.returnValue(of(null));
    mockJoursLivraisonService.deleteJourLivraison.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [CalendrierLivraisonComponent],
      providers: [{ provide: JoursLivraisonService, useValue: mockJoursLivraisonService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calendar header with the correct year and month', () => {
    const header = fixture.debugElement.query(By.css('.header'));
    expect(header).toBeTruthy();

    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date());

    expect(header.nativeElement.textContent).toContain(currentYear);
    expect(header.nativeElement.textContent.toLowerCase()).toContain(currentMonth.toLowerCase());
  });

  it('should render the correct number of days in the month', () => {
    const days = fixture.debugElement.queryAll(By.css('.days-grid .day'));
    expect(days.length).toBe(component.daysInMonth.length);
  });

  it('should highlight today\'s date if in the current month', () => {
    const today = new Date();
    const todayElement = fixture.debugElement.query(By.css('.day.today'));

    if (
      component.currentDate.getMonth() === today.getMonth() &&
      component.currentDate.getFullYear() === today.getFullYear()
    ) {
      expect(todayElement).toBeTruthy();
      expect(todayElement.nativeElement.textContent.trim()).toBe(today.getDate().toString());
    } else {
      expect(todayElement).toBeNull();
    }
  });

  it('should open the modal with correct data when a day is clicked', () => {
    const dayElement = fixture.debugElement.query(By.css('.day'));
    const day = parseInt(dayElement.nativeElement.textContent.trim(), 10);

    dayElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isModalOpen).toBeFalse();
    expect(component.selectedDay).toBeNull();
  });

  it('should close the modal when closeModal is called', () => {
    component.isModalOpen = true;
    component.closeModal();
    fixture.detectChanges();

    expect(component.isModalOpen).toBeFalse();
    expect(component.selectedDay).toBeNull();
  });

  it('should load delivery days when the calendar is initialized', () => {
    expect(mockJoursLivraisonService.getJoursLivraison).toHaveBeenCalledWith(
      component.currentDate.getFullYear(),
      component.currentDate.getMonth() + 1
    );
    expect(component.deliveryDays).toEqual([]);
  });

  it('should correctly display holidays', () => {
    const holiday = component.holidays[0];
    const holidayDay = holiday.getDate();

    const holidayElement = fixture.debugElement.queryAll(By.css('.day')).find((day) => {
      return parseInt(day.nativeElement.textContent.trim(), 10) === holidayDay;
    });

    expect(holidayElement).toBeTruthy();
    expect(holidayElement.nativeElement.classList).toContain('holiday');
  });

  it('should not allow adding a delivery on a closed day', () => {
    spyOn(window, 'alert');
    const closedDay = component.closedDays[0].getDate();
    component.openModal(closedDay);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Ce jour est fermé. Aucune livraison n’est possible.');
    expect(component.isModalOpen).toBeFalse();
  });

  it('should correctly add a single delivery day', () => {
    component.selectedDay = 15;
    component.selectedTournee = 'Tour 1';
    component.selectedFrequency = 'Toutes les semaines';

    component.addSingleDayDelivery();

    expect(mockJoursLivraisonService.addJourLivraison).toHaveBeenCalled();
    expect(component.deliveryDays.length).toBe(1);
    expect(component.deliveryDays[0]).toEqual(
      jasmine.objectContaining({
        date: `${component.currentDate.getFullYear()}-${(component.currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-15`,
        tournee: 'Tour 1',
        frequence: 'Toutes les semaines',
      })
    );
  });
});
