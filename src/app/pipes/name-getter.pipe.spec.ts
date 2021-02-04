import { NameGetterPipe } from './name-getter.pipe';

describe('NameGetterPipe', () => {
  it('create an instance', () => {
    const pipe = new NameGetterPipe();
    expect(pipe).toBeTruthy();
  });
});
