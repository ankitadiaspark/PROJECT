import { inject, TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('NotificationsService', () => {
    let service: NotificationsService;
    let httpMock: HttpTestingController;
    let msg;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
            providers: [NotificationsService]
        });
        service = TestBed.get(NotificationsService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('notification service should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should display success message', () => {
        let app = service.snackBar;
        service.success(msg);
        spyOn(service, 'success');
        spyOn(app, 'open');
        expect(service.config['panelClass']).toContain('notification', 'success');
    });

    it('should return warning message', () => {
        let app = service.snackBar;
        service.warn(msg);
        spyOn(service, 'warn');
        spyOn(app, 'open');
        expect(service.config['panelClass']).toContain('notification', 'warn');
    });

    afterEach(() => {
        httpMock.verify();
    });
});


