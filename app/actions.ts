'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const userInfoSchema = z.object({
  userName: z.string(),
  email: z.string().email().min(3).max(255),
  phone: z.string(),
});

type CreateUserInfoResultDTO = {
  zodIssues?: z.ZodIssue[];
  error?: string;
  isCreatedUser: true | false;
};

export async function createUserInfo(
  formData: FormData
): Promise<CreateUserInfoResultDTO> {
  const supabase = await createClient();

  const data = {
    userName: formData.get('user_name') as string,
    email: formData.get('user_email') as string,
    phone: formData.get('phoneNumber')?.toString() as string,
  };

  const validatedData = userInfoSchema.parse(data);

  const { data: userInfo, error: userInfoError } = await supabase
    .from('users_leads_table')
    .insert([
      {
        user_name: validatedData.userName,
        user_email: validatedData.email,
        phone_number: validatedData.phone,
        created_a_game: false,
      },
    ]);

  if (userInfoError?.code === '42501' || userInfoError !== null) {
    return {
      error: 'Invalid credentials. Please try again',
      isCreatedUser: false,
    };
  }

  return {
    isCreatedUser: true,
  };
}
