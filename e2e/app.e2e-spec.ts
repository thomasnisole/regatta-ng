import { RegattaNgPage } from './app.po';

describe('regatta-ng App', () => {
  let page: RegattaNgPage;

  beforeEach(() => {
    page = new RegattaNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
