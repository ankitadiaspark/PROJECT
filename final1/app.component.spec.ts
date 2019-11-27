import { async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component:AppComponent;
  beforeEach(async(() => {
    component=new AppComponent();
  }));

  it('should create the app', () => {
    const app = component;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ui'`, () => {
    const app = component.title;
    expect(app).toEqual('ui');
  });
});
