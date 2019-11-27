import {async, TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Component } from '@angular/core';

describe('NotificationsService', () => {
  let service:NotificationsService;
  let snackbar:MatSnackBar;
  let msg;
  let config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  beforeEach(async(() => {
    service=new NotificationsService(snackbar);
  }));


  it('should be created', () => {
    
    const app = service;
    expect(app).toBeTruthy();
  });

  it('should return success message',()=>{
    service.success(msg);
    let openSnackbar=service.snackBar.open(msg,'',service.config)
    expect(service.config['panelClass']).toContain('notification', 'success');
    expect(openSnackbar).toBeTruthy();
  });

  it('should return warning message',()=>{
    service.warn(msg);
    expect(service.config['panelClass']).toContain('notification', 'warn');
    expect(service.snackBar.open(msg,'',service.config)).toBeTruthy();
  });
});
