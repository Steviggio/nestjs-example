import { User } from './users.interface';

describe('Users', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
