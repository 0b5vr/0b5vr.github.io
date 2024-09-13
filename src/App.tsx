import { Editor } from './Components/Editor';
import { Link } from './Components/Link';
import { NpmBadge } from './Components/NpmBadge';
import { SmallAside } from './Components/SmallAside';
import { Paragraph } from './Components/Paragraph';
import { Toolbox } from './Components/Toolbox';

export const App: React.FC = () => {
  return (
    <div className="grid place-items-center">
      <article className="my-4 p-2 w-full max-w-sm md:max-w-2xl">
        <h1 className="w-full">0b5vr.com</h1>

        <Paragraph>
          <NpmBadge />
        </Paragraph>

        <h2>Stuff</h2>

        <Paragraph>
          I love making cryptic html files!!!!!
        </Paragraph>

        <SmallAside>Inside YouTube, YouTube is the rule.</SmallAside>

        <Paragraph>
          <iframe src="https://www.youtube.com/embed/3lOptjAeA2w"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full my-2 aspect-video"
          />
          <iframe src="https://www.youtube.com/embed/Ay2ht_dgVw8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full my-2 aspect-video"
          />
          <iframe src="https://www.youtube.com/embed/D2COWeeEqTs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full my-2 aspect-video"
          />
        </Paragraph>

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
          src="https://weepjp.neocities.org/harbot/"
        ></iframe>

        <SmallAside>
          <Link href="https://weepjp.neocities.org/harbot/">https://weepjp.neocities.org/harbot/</Link>
        </SmallAside>

        <h2>Link</h2>

        <ul className="list-disc">
          <li><Link href="https://twitter.com/0b5vr">Twitter</Link> (en, promotional)</li>
          <li><Link href="https://twitter.com/0m5vr">Twitter 2</Link> (ja, daily)</li>
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
