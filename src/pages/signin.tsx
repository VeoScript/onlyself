import { useState } from 'react';
import nookies from 'nookies';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '~/components/templates/MainLayout';

import { GetServerSidePropsContext } from 'next';
import { signinValidation } from '~/helpers/hooks/useValidation';
import { useGetUser } from '~/helpers/tanstack/queries/user';
import { useSignInMutation } from '~/helpers/tanstack/mutations/auth/signin';

const SignIn = (): JSX.Element => {
  const signinMutation = useSignInMutation();

  const { data: user, isLoading: isLoadingUser } = useGetUser();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();

      await signinValidation.validate({ email, password }, { abortEarly: false });

      setIsLoading(true);

      await signinMutation.mutateAsync(
        {
          email,
          password,
        },
        {
          onError: (error: any) => {
            setIsLoading(false);
            setError(error.response.data.message);
          },
          onSuccess: () => {
            setIsLoading(false);
          },
        },
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Onlyself | Sign In</title>
      </Head>
      <MainLayout user={user} isLoading={isLoadingUser}>
        <div className="mt-10 flex h-screen w-full flex-col items-center justify-start md:-mt-20 md:justify-center">
          <div className="flex w-full max-w-md flex-col gap-y-5">
            <div className="flex w-full flex-col items-start gap-y-1">
              <h1 className="ml-2 text-xl font-bold text-accent-2">Sign In</h1>
            </div>
            {error && (
              <div className="flex w-full flex-row items-center justify-center rounded-xl bg-red-400 p-3">
                <p className="text-xs font-light text-white">{error}</p>
              </div>
            )}
            <form onSubmit={handleSignIn} className="flex w-full flex-col items-center gap-y-3">
              <div
                className="flex w-full flex-col items-start gap-y-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <label className="ml-2 text-xs text-accent-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-accent-3 bg-accent-1 p-3 text-sm text-accent-3 outline-none focus:border-accent-2"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setError(null);
                    setFormErrors(null);
                    setEmail(e.currentTarget.value);
                  }}
                />
                {formErrors && formErrors.email && (
                  <span className="ml-2 mt-1 text-xs text-red-400">{formErrors.email}</span>
                )}
              </div>
              <div
                className="flex w-full flex-col items-start gap-y-1"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <label className="ml-2 text-xs text-accent-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-accent-3 bg-accent-1 p-3 text-sm text-accent-3 outline-none focus:border-accent-2"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setError(null);
                    setFormErrors(null);
                    setPassword(e.currentTarget.value);
                  }}
                />
                {formErrors && formErrors.password && (
                  <span className="ml-2 mt-1 text-xs text-red-400">{formErrors.password}</span>
                )}
              </div>
              <div
                className="flex w-full flex-col items-center justify-center gap-x-0 gap-y-3 md:flex-row md:justify-between md:gap-x-1 md:gap-y-0"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex w-full flex-row items-center justify-center gap-x-1 text-xs font-light text-accent-1 md:justify-start">
                  <span>Don&apos;t have an account?</span>
                  <Link href="/signup" className="font-bold text-accent-2 hover:underline">
                    Sign Up
                  </Link>
                </div>
                <button
                  type="submit"
                  className={clsx(
                    isLoading && 'opacity-50',
                    'w-full rounded-xl bg-accent-2 p-3 text-center text-xs text-accent-3 outline-none hover:bg-opacity-50 md:w-auto md:px-5',
                  )}
                >
                  {isLoading ? 'Loading...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx);

  if (cookies['onlyself']) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookies,
    },
  };
}

export default SignIn;
