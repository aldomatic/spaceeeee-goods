import fs from 'fs';

describe('Spaceeee Suite', () => {
  it('Check if dates file exists', () => {
    expect(fs.existsSync('./dates.txt')).toEqual(true);
  });
});