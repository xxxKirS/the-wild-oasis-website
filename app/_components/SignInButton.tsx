import Image from 'next/image';
import { signInAction } from '../_lib/actions';

function SignInButton() {
  return (
    <form action={signInAction}>
      <button
        type='submit'
        className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:bg-primary-300 hover:text-primary-900 transition-colors duration-300'
      >
        <Image
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
