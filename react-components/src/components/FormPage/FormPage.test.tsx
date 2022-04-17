import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';
import { renderWithRouter } from '../../utils/testHelpers';

describe('form correctly renders', () => {
  it('own elements', async () => {
    act(() => {
      renderWithRouter(<App />, { route: '/form' });

      const fullNameField = screen.getByPlaceholderText(/Fullname/);
      const maleGenderField = screen.getByText(/Male/);
      const fileField = screen.getByText(/Place your file/).nextElementSibling as HTMLInputElement;
      const htmlSkill = screen.getByText(/HTML/);
      const cssSkill = screen.getByText(/CSS/);
      const birthdayField = screen.getByLabelText(/Choose your birthday/);
      const cityField = screen.getByLabelText(/Choose your city/);
      const testCity = screen.getByText(/Brest/);
      const emailField = screen.getByPlaceholderText(/Email/);
      const agreedField = screen.getByText(/I agree with the terms/);
      const submitButton = screen.getByText(/Submit the form!/);
      const file = new File([new Blob()], 'test.png', {
        type: 'image/png',
        lastModified: Date.now(),
      });

      userEvent.type(fullNameField, 'Illia');
      userEvent.click(maleGenderField);
      userEvent.upload(fileField, file);
      userEvent.click(htmlSkill);
      userEvent.click(cssSkill);
      userEvent.type(birthdayField, '2017-05-05');
      userEvent.selectOptions(cityField, testCity);
      userEvent.type(emailField, 'test@test.com');
      userEvent.click(agreedField);
      userEvent.click(submitButton);

      expect(screen.queryByText(/Please/)).toBeNull();
      screen.debug();
    });
  });
});
