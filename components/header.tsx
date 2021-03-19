import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  // const [user, setUser] = useState('');
  const [session] = useSession();
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      {/* {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))} */}
      <>
        <div>
          <p>
            {!session && (
              <>
                <span>You are not signed in</span>
                <a
                  href="/api/auth/signin"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url(${session.user.image})` }}
                  />
                )}
                <span>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email || session.user.name}</strong>
                </span>
                <a
                  href="/api/auth/signout"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
      </>
      {/* <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><Link href="/"><a>Home</a></Link></li>
          <li className={styles.navItem}><Link href="/client"><a>Client</a></Link></li>
          <li className={styles.navItem}><Link href="/server"><a>Server</a></Link></li>
          <li className={styles.navItem}><Link href="/protected"><a>Protected</a></Link></li>
          <li className={styles.navItem}><Link href="/api-example"><a>API</a></Link></li>
        </ul>
      </nav> */}
    </header>
  );
}
// Header.getInitialProps = async () => {
//   return {
//     providers: await providers()
//   }
// }
