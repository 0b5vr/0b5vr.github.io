import { Editor } from './Components/Editor';
import { Link } from './Components/Link';
import { NpmBadge } from './Components/NpmBadge';
import { SmallAside } from './Components/SmallAside';
import { Paragraph } from './Components/Paragraph';
import { Toolbox } from './Components/Toolbox';

export const App: React.FC = () => {
  return (
    <div className="grid place-items-center">
      <article className="my-4 p-2 max-w-sm md:max-w-2xl">
        <h1 className="w-full">0b5vr.com</h1>

        <Paragraph>
          <NpmBadge />
        </Paragraph>

        <Paragraph>
          hihhahihhahihhahihhahihhahihha hihhahihhahihhahihh ahihhahi hhahihhahihhahihha hihhahihha hihhahih hahihhahihhahihha
        </Paragraph>
        <SmallAside>English translation: under construction</SmallAside>

        <h2>Domain</h2>

        <Paragraph>
          My first WebGL 64KB Intro !!!!!!<br />
          Appeared in Combined Demo Compo @ <Link href="https://tokyodemofest.jp">TokyoDemoFest 2021</Link>
        </Paragraph>

        <Paragraph>
          <Link href="http://0b5vr.com/domain/">Watch the demo</Link>
        </Paragraph>

        <Paragraph>
          <iframe src="https://www.youtube.com/embed/D2COWeeEqTs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full my-2 aspect-video"
          />
        </Paragraph>
        <SmallAside>Inside YouTube, YouTube is the rule.</SmallAside>

        <h2>Toolbox</h2>

        <Paragraph>
          From actual tools to low effort shitposts
        </Paragraph>

        <Toolbox />

        <h2>Editor</h2>

        <Editor />
        <SmallAside>Use at your own risk.</SmallAside>

        <h2>Harbot</h2>

        <iframe
          className="bg-transparent my-2"
          width="135"
          height="210"
          scrolling="no"
          src="https://weep.page/harbot/"
        ></iframe>

        <SmallAside>
          <Link href="https://weep.jp/harbot">https://weep.jp/harbot</Link>
        </SmallAside>

        <h2>Link</h2>

        <ul className="list-disc">
          <li><Link href="https://twitter.com/0b5vr">Twitter</Link> (en)</li>
          <li><Link href="https://twitter.com/0m5vr">Twitter 2</Link> (ja)</li>
          <li><Link href="https://cohost.org/0b5vr">cohost</Link></li>
          <li><Link href="https://www.pouet.net/user.php?who=104878">pouët</Link></li>
          <li><Link href="https://shadertoy.com/user/0b5vr">Shadertoy</Link></li>
          <li><Link href="https://github.com/0b5vr">GitHub</Link></li>
          <li><Link href="https://scrapbox.io/0b5vr/">Scrapbox</Link></li>
        </ul>

        <h2>Contact</h2>

        <Paragraph>
          no
        </Paragraph>
      </article>
    </div>
  );
}
