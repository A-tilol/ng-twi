import { NgTwiPage } from './app.po';

describe('ng-twi App', () => {
  let page: NgTwiPage;

  beforeEach(() => {
    page = new NgTwiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
