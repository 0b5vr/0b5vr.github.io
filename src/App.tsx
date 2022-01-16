import { Link } from './Components/Link';
import { SmallAside } from './Components/SmallAside';

export const App: React.FC = () => {
  return (
    <div className="grid place-items-center">
      <article className="my-4 p-2 max-w-xl">
        <h1>0b5vr.com</h1>

        <p>
          hihhahihhahihhahihhahihhahihha hihhahihhahihhahihh ahihhahihhahihhahihhahihhahihhahihhahihhahihhahihhahihhahihha
          <SmallAside>English translation: under construction</SmallAside>
        </p>

        <h2>Domain</h2>

        <p>
          My first WebGL 64KB Intro !!!!!!<br />
          Appeared in Combined Demo Compo @ <Link href="https://tokyodemofest.jp">TokyoDemoFest 2021</Link>
        </p>

        <p>
          <Link href="http://0b5vr.com/domain/">Watch the demo</Link>
        </p>

        <p>
          <iframe src="https://www.youtube.com/embed/D2COWeeEqTs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full my-2 aspect-video"
          />
          <SmallAside>Inside YouTube, YouTube is the rule.</SmallAside>
        </p>

        <h2>Harbot</h2>

        <iframe src="https://weep.jp/embed/harbot/"
          width="135"
          height="210"
          scrolling="no"
          className="my-2"
        />
        <SmallAside>
          <Link href="https://weep.jp/harbot">https://weep.jp/harbot</Link>
        </SmallAside>

        <h2>Link</h2>

        <ul>
          <li><Link href="https://twitter.com/0b5vr">Twitter</Link> (en)</li>
          <li><Link href="https://twitter.com/0m5vr">Twitter 2</Link> (ja)</li>
          <li><Link href="https://www.pouet.net/user.php?who=104878">pouët</Link></li>
          <li><Link href="https://shadertoy.com/user/0b5vr">Shadertoy</Link></li>
          <li><Link href="https://scrapbox.io/0b5vr/">Scrapbox</Link></li>
          <li><Link href="http://airhorn-wav.glitch.me/">airhorn.wav</Link></li>
        </ul>

        <h2>Contact</h2>

        <p>
          no
        </p>
      </article>
    </div>
  );
}
