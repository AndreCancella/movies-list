import { Users } from '../entity/user.entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new Users()).toBeDefined();
  });
});
