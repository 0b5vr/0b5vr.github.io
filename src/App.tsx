import { useCallback, useState } from 'react';
import { Background } from './Components/Background';
import { Editor } from './Components/Editor';
import { Link } from './Components/Link';
import { NpmBadge } from './Components/NpmBadge';
import { Paragraph } from './Components/Paragraph';
import { SmallAside } from './Components/SmallAside';
import { YouTube } from './Components/YouTube';

export const App: React.FC = () => {
  const [fancy, setFancy] = useState(true);

  const toggleFancy = useCallback(() => {
    setFancy((prev) => !prev);
  }, []);

  return (
    <>
      {fancy && <Background />}

      <div className="relative grid place-items-center">
        <article className="my-4 p-2 w-full max-w-sm md:max-w-2xl">
          <h1 className="w-full">0b5vr.com</h1>

          <Paragraph>
            <NpmBadge />
          </Paragraph>

          <Paragraph>
            <button
              type="button"
              className="cursor-pointer text-sm hover:opacity-80 active:opacity-60"
              onClick={toggleFancy}
            >
              {fancy
                ? '(Click here to stop being fancy)'
                : '(Click here to go fancy)'}
            </button>
          </Paragraph>

          <h2>Stuff</h2>

          <Paragraph>I love making cryptic html files!!!!!</Paragraph>

          <SmallAside>Inside YouTube, YouTube is the rule.</SmallAside>

          <Paragraph>
            <span className="grid gap-2 grid-cols-1 md:grid-cols-2">
              <YouTube url="https://www.youtube.com/embed/OewtzMN0qO0" />
              <YouTube url="https://www.youtube.com/embed/3lOptjAeA2w" />
              <YouTube url="https://www.youtube.com/embed/Ay2ht_dgVw8" />
              <YouTube url="https://www.youtube.com/embed/D2COWeeEqTs" />
            </span>
          </Paragraph>

          <h2>Editor</h2>

          <Editor />
          <SmallAside>Use at your own risk.</SmallAside>

          <h2>Harbot</h2>

          <iframe
            title="Harbot Clock"
            className="bg-transparent my-2"
            width="135"
            height="210"
            scrolling="no"
            src="https://weepjp.neocities.org/harbot/"
          ></iframe>

          <SmallAside>
            <Link href="https://weepjp.neocities.org/harbot/">
              https://weepjp.neocities.org/harbot/
            </Link>
          </SmallAside>

          <h2>Link</h2>

          <ul className="list-disc">
            <li>
              <Link href="https://twitter.com/0b5vr">Twitter</Link>
            </li>
            <li>
              <Link href="https://www.pouet.net/user.php?who=104878">
                pouët
              </Link>
            </li>
            <li>
              <Link href="https://shadertoy.com/user/0b5vr">Shadertoy</Link>
            </li>
            <li>
              <Link href="https://github.com/0b5vr">GitHub</Link>
            </li>
            <li>
              <Link href="https://scrapbox.io/0b5vr/">Scrapbox</Link>
            </li>
          </ul>

          <h2>Contact</h2>

          <Paragraph>no</Paragraph>
        </article>
      </div>
    </>
  );
};
