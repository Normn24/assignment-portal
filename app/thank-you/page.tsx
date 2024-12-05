'use client';

import Layout from '@/components/Layout';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const ThankYouPage = () => {
  const router = useRouter();

  return (
    <Layout>
    <div className="flex flex-col items-center justify-center  text-center">
      <h1 className="text-2xl font-bold">Thank you for submitting your assignment!</h1>
      <p className="mt-4 text-white">We will review your submission soon.</p>
      <button
        onClick={() => router.push('/')}
        className={clsx(
          "button-submit",
          "!mt-6 !px-6 !w-auto",
        )}>
        Back to Form
      </button>
    </div>
  </Layout>
  );
};

export default ThankYouPage;
