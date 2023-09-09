import { formatCreateAccountInputData } from '@/formatters/account';

describe('formatCreateAccountInputData', () => {
  it('should return formatted data', async () => {
    const createAccountInput = {
      firstName: 'John ',
      lastName: ' Doe',
      email: ' TEST@gmail.com ',
      password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
    };

    const formattedData =
      await formatCreateAccountInputData(createAccountInput);

    expect(formattedData.firstName).toEqual('john');
    expect(formattedData.lastName).toEqual('doe');
    expect(formattedData.email).toEqual('test@gmail.com');
    expect(formattedData.passwordHash).not.toEqual(createAccountInput.password);
  });

  it('should remove html tags from input', async () => {
    const createAccountInput = {
      firstName: '<script>John</script>',
      lastName: '<script>Doe</script>',
      email: 'test@gmail.com',
      password: 'djisufijodsfmdsio',
    };

    const formattedData =
      await formatCreateAccountInputData(createAccountInput);

    expect(formattedData.firstName).toEqual(
      '&lt;script&gt;john&lt;/script&gt;'
    );
    expect(formattedData.lastName).toEqual('&lt;script&gt;doe&lt;/script&gt;');
  });
});
