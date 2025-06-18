import { auth } from '../_lib/auth';
import NavigationList from './NavigationList';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <NavigationList session={session} />
      </ul>
    </nav>
  );
}
