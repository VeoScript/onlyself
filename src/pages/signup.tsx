import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '~/components/templates/MainLayout';

import { signupValidation } from '~/helpers/hooks/useValidation';

const SignUp = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<any>();

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();

      await signupValidation.validate({ name, email, password, repassword }, { abortEarly: false });

      console.log('SIGN UP', {
        name,
        email,
        password,
      });
    } catch (error: any) {
      const errors: any = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Head>
        <title>Onlyself | Sign Up</title>
      </Head>
      <MainLayout>
        <div className="mb-10 mt-10 flex h-screen w-full flex-col items-center justify-start md:-mt-20 md:mb-0 md:justify-center">
          <div
            className="flex w-full max-w-md flex-col gap-y-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex w-full flex-col items-start gap-y-1">
              <h1 className="text-accent-2 ml-2 text-xl font-bold">Sign Up</h1>
            </div>
            <form onSubmit={handleSignUp} className="flex w-full flex-col items-center gap-y-3">
              <div
                className="flex w-full flex-col items-start gap-y-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <label className="ml-2 text-xs text-neutral-600" htmlFor="name">
                  Full name
                </label>
                <input
                  className="focus:border-accent-2 w-full rounded-xl border border-neutral-300 p-3 text-sm text-neutral-600 outline-none"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setFormErrors(null);
                    setName(e.currentTarget.value);
                  }}
                />
                {formErrors && formErrors.name && (
                  <span className="ml-2 mt-1 text-xs text-red-400">{formErrors.name}</span>
                )}
              </div>
              <div
                className="flex w-full flex-col items-start gap-y-1"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <label className="ml-2 text-xs text-neutral-600" htmlFor="email">
                  Email
                </label>
                <input
                  className="focus:border-accent-2 w-full rounded-xl border border-neutral-300 p-3 text-sm text-neutral-600 outline-none"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
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
                data-aos-delay="600"
              >
                <label className="ml-2 text-xs text-neutral-600" htmlFor="password">
                  Password
                </label>
                <input
                  className="focus:border-accent-2 w-full rounded-xl border border-neutral-300 p-3 text-sm text-neutral-600 outline-none"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setFormErrors(null);
                    setPassword(e.currentTarget.value);
                  }}
                />
                {formErrors && formErrors.password && (
                  <span className="ml-2 mt-1 text-xs text-red-400">{formErrors.password}</span>
                )}
              </div>
              <div
                className="flex w-full flex-col items-start gap-y-1"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <label className="ml-2 text-xs text-neutral-600" htmlFor="repassword">
                  Re-enter password
                </label>
                <input
                  className="focus:border-accent-2 w-full rounded-xl border border-neutral-300 p-3 text-sm text-neutral-600 outline-none"
                  type="password"
                  id="repassword"
                  value={repassword}
                  onChange={(e) => {
                    setFormErrors(null);
                    setRepassword(e.currentTarget.value);
                  }}
                />
                {formErrors && formErrors.repassword && (
                  <span className="ml-2 mt-1 text-xs text-red-400">{formErrors.repassword}</span>
                )}
              </div>
              <div
                className="flex w-full flex-col items-center justify-center gap-x-0 gap-y-3 md:flex-row md:justify-between md:gap-x-1 md:gap-y-0"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <div className="flex w-full flex-row items-center justify-center gap-x-1 text-xs font-light text-neutral-600 md:justify-start">
                  <span>Already have an account?</span>
                  <Link href="/signin" className="text-accent-1 font-bold hover:underline">
                    Sign In
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-accent-2 w-full rounded-xl p-3 text-center text-xs text-green-700 outline-none hover:bg-opacity-50 md:w-auto md:px-5"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SignUp;
