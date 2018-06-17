import { ShellClientModule } from './shell-client.module';

describe('ShellClientModule', () => {
  let shellClientModule: ShellClientModule;

  beforeEach(() => {
    shellClientModule = new ShellClientModule();
  });

  it('should create an instance', () => {
    expect(shellClientModule).toBeTruthy();
  });
});
