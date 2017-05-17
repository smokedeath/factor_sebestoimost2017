import { FactorSebestoimost2017Page } from './app.po';

describe('factor-sebestoimost2017 App', () => {
  let page: FactorSebestoimost2017Page;

  beforeEach(() => {
    page = new FactorSebestoimost2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
