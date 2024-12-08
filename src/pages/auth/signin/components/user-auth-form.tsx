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
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getUserLogin } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (submitData: UserFormValue) => {
    const data = await getUserLogin({ ...submitData });
    if (data.success) {
      dispatch(login(data));
      toast.success('Logged in successfully');
      router.back();
      router.back();
    } else {
      console.log(data);
      toast.error(data.response.data.message);
    }
  };

  const gotoSignUp = () => {
    navigate('/signup');
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Id or Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Id..."
                    disabled={loading}
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
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="secondary"
            disabled={loading}
            className="ml-auto w-full"
            type="submit"
          >
            Continue
          </Button>
          <div className="mt-3 flex w-full justify-center">
            <Button onClick={()=> gotoSignUp()} type="button" variant="default">
              signUp
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
