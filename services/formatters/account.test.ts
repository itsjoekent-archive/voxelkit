import { formatCreateAccountInputData } from '@/formatters/account';
import { defaultLanguage } from '@voxelkit/translations';

describe('formatCreateAccountInputData', () => {
  it('should return formatted data', async () => {
    const createAccountInput = {
      firstName: 'John ',
      lastName: ' Doe',
      email: ' TEST@gmail.com ',
      password: 'aV7jNk47quZk!6eHWjon!2dkgtJTYs8T',
      language: defaultLanguage,
    };

    const formattedData =
      await formatCreateAccountInputData(createAccountInput);

    expect(formattedData.firstName).toEqual('John');
    expect(formattedData.lastName).toEqual('Doe');
    expect(formattedData.email).toEqual('test@gmail.com');
    expect(formattedData.passwordHash).not.toEqual(createAccountInput.password);
  });

  it('should remove html tags from input', async () => {
    const createAccountInput = {
      firstName: '<script>John</script>',
      lastName: '<script>Doe</script>',
      email: 'test@gmail.com',
      password: 'djisufijodsfmdsio',
      language: defaultLanguage,
    };

    const formattedData =
      await formatCreateAccountInputData(createAccountInput);

    expect(formattedData.firstName).toEqual(
      '&lt;script&gt;John&lt;/script&gt;'
    );
    expect(formattedData.lastName).toEqual('&lt;script&gt;Doe&lt;/script&gt;');
  });
});
