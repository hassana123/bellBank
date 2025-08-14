import type { LoginResponseType } from '~/types';
import type { ApiLoginResponseType } from '../types';

export function serializeLogin(csrfToken: string, input: ApiLoginResponseType): LoginResponseType['data'] {
  const data: LoginResponseType['data'] = {
    csrfToken,
    token: input.token,
    user: {
      id: input.data.id,
      name: `${input.data.firstName} ${input.data.middleName || ''}`.trim() + ` ${input.data.lastName}`,
      displayName: null,
      email: input.data.email,
      phone: input.data.phone,
      address: null,
      city: 'N/A',
      state: 'N/A',
      logo: null,
    },
  };
  return data;
}
