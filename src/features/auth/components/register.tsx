"use client";
import {zodResolver} from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useForm} from'react-hook-form';
import {z} from'zod';
import {toast} from 'sonner';
import { Button } from '@/components/ui/button';
import{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';
const refisterSchema = z.object({
    email: z.email('Enter your email'),
    password: z.string().min(1,'Password is required'),
    confirmPassword:z.string(),
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords do not match",
    path:["confirmPassword"],
});
type RegisterFromValues = z.infer<typeof refisterSchema>;
export function RegisterFrom(){
    const router = useRouter();
    const form = useForm<RegisterFromValues>({
        resolver: zodResolver(refisterSchema),
        defaultValues:{
            email:"",
            password:"",
            confirmPassword:"",
        },
    });
    const onSubmit = async (data:RegisterFromValues) => {
        await authClient.signUp.email({
            name:data.email,
            email:data.email,
            password:data.password,
            callbackURL:'/'
        },{
            onSuccess:()=>router.push('/'),
            onError:(ctx)=>toast.error(ctx.error.message),
        })
    }
    const isPending = form.formState.isSubmitting;
    return(<div className='flex flex-col gap-6'>
        <Card className={cn('w-full max-w-md mx-auto')}>    
        <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold'>Get Started</CardTitle>
            <CardDescription>
                Create an account to continue
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='grid gap-6'>
                        <div className='flex flex-col gap-4'></div>
                            <Button 
                            variant={'outline'}
                            className='w-full'
                            type='button'
                            disabled={isPending}
                            >   continue with Google</Button>
                    </div>
                    <div className='grid gap-6'>
                        <FormField
                        control={form.control}
                        name='email'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder='Enter your email'
                                    type='email'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name='password'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder='Enter your passwrod'
                                    type='password'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder='Enter your passwrod again'
                                    type='password'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className='w-full' disabled={isPending}>
                            SignUp
                        </Button>
                    </div>
                    <div className='text-center text-sm'>
                        Already have an account?{' '}
                        <Link href='/login' className='text-primary underline-offset-4'>
                        Login
                        </Link>
                    </div>
                </form>
            </Form>
        </CardContent>
        </Card>
    </div>)
}