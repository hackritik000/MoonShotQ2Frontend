import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api, methods } from '@/lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z
  .object({
    userId: z.string().min(3,{message: "minimun 3 characters required"}),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Enter a valid email address'),
    fullname: z.string(),
    phoneNumber: z
      .string()
      .length(10, { message: 'Phone Number must be 10 digit long' })
      .regex(/^[0-9]*$/, { message: 'only use Number' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match'
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const navigate = useNavigate();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      email: '',
      fullname: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    }
  });
  const onSubmit = async (formData: UserFormValue) => {
    try {
      formData.fullname = formData.email;
      const response = await api(methods.post, '/api/v1/users/register', {
        ...formData
      });
      if (response.success) {
        toast.success('Registered successfully');
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Id</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Create Your UserId ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Full Name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your phone number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
           )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3 flex w-full justify-center">
            <Button type="submit" variant="secondary">
              Continue
            </Button>
          </div>
          <div className="mt-3 flex w-full justify-center">
            <Button onClick={()=> gotoLogin()} type="button" variant="default">
              Login
            </Button>
          </div>
        </form>
        </Form>
    </>
  );
}
