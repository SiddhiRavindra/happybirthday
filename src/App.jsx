import { useEffect, useRef, useState } from 'react';
import giftBoxImage from './Ornate Dadi’s PUNE Luxury Gift Box.png';
import giftBoxOpenImage from './gift_box_open.png';
import ladooImage from './ladoo-clean.png';
import bubuImage from './bubu-clean.png';
import hbdImage from './hbd-clean.gif';
import duduDanceImage from './dududance-clean.gif';
import cakeImage from './LotusBiscoff_cake_clean.png';
import candleImage from './16nocandle-clean.png';
import memo1Image from './memo1.jpeg';
import memo2Image from './memo2.jpeg';
import memo3Image from './memo3.jpeg';
import memo4Image from './memo4.jpeg';
import memo5Image from './memo5.jpeg';
import memo6Image from './memo6.jpeg';
import memo7Image from './memo7.jpeg';

const photos = [
  {
    className: 'photo-card--tall',
    image: memo1Image,
    alt: 'Memory photo 1',
    number: '01',
    title: 'the beginning of a thousand stories',
    caption: 'where the good noise started',
  },
  {
    className: 'photo-card--wide',
    image: memo2Image,
    alt: 'Memory photo 2',
    number: '02',
    title: 'your people, your kind of magic',
    caption: 'the ones who know all your versions',
  },
  {
    className: 'photo-card--small',
    image: memo3Image,
    alt: 'Memory photo 3',
    number: '03',
    title: 'the soft, sunny chapters',
    caption: 'golden hour suits you',
  },
  {
    className: 'photo-card--last',
    image: memo4Image,
    alt: 'Memory photo 4',
    number: '04',
    title: 'and the story keeps getting better',
    caption: 'next chapter: absolutely everything',
  },
  {
    className: 'photo-card--tall',
    image: memo5Image,
    alt: 'Memory photo 5',
    number: '05',
    title: 'the little celebrations',
    caption: 'make a wish, then make it bigger',
  },
  {
    className: 'photo-card--wide',
    image: memo6Image,
    alt: 'Memory photo 6',
    number: '06',
    title: 'more joy than one frame can hold',
    caption: 'the party is only just beginning',
  },
  {
    className: 'photo-card--small',
    image: memo7Image,
    alt: 'Memory photo 7',
    number: '07',
    title: 'another favourite little moment',
    caption: 'one more reason to celebrate',
  },
];

function Eyebrow({ children, dark = false }) {
  return <p className={`eyebrow${dark ? ' eyebrow--dark' : ''}`}><span />{children}</p>;
}

function SweetBox({ isOpen, onOpen, boxRef }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const treats = Array.from({ length: 12 }, (_, index) => index);

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setTilt({ x: y * -5, y: x * 7 });
  }

  return (
    <>
      <button ref={boxRef} className={`sweet-box${isOpen ? ' is-open' : ''}`} type="button" aria-label="Open the sweet box" onClick={onOpen} onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}>
        <img className="gift-box-image" src={isOpen ? giftBoxOpenImage : giftBoxImage} alt="" />
        <span className="ladoo-pop"><img src={ladooImage} alt="" /></span>
        <span className="box__shine" />
        <span className="box__lid"><i /><b /><small>FOR DIAMOND</small></span>
        <span className="box__body"><span>OPEN<br />ME</span><i className="box__inner" /><i className="box__seal">D</i><span className="box__contents" aria-hidden="true">{treats.map((treat) => <i className={`box__treat${treat === 5 ? ' box__treat--ladu' : ''}`} key={treat}>{treat === 5 && <img src={ladooImage} alt="" />}</i>)}</span></span>
        <span className="box__shadow" />
      </button>
      <p className="tap-hint"><span>{isOpen ? 'the sweetest surprise' : 'tap the box'}</span> <b>{isOpen ? '↓' : '↗'}</b></p>
    </>
  );
}

function ChocolateCake({ revealedCount, isBlown, onTap }) {
  return (
    <section className="cake-section" id="cake">
      <div className="cake-copy reveal"><Eyebrow dark>A little more celebration</Eyebrow><h2>Save room<br />for <em>memories.</em></h2><button className={`cake-candle-button${isBlown ? ' is-lit' : ''}`} type="button" aria-label="Tap the candle to reveal seven birthday memories" aria-pressed={isBlown} onClick={onTap}><img className="cake-candle" src={candleImage} alt="" /><span className="cake-candle-flame" aria-hidden="true" /></button><p>Tap the candle and let the next seven little chapters arrive one by one.</p></div>
      <div className="cake-stage">
        {photos.map((photo, index) => <figure className={`cake-memory cake-memory--${index + 1}${index < revealedCount ? ' is-visible' : ''}`} key={photo.number}><img src={photo.image} alt={photo.alt} /><figcaption>{photo.number}</figcaption></figure>)}
        <button className={`chocolate-cake${isBlown ? ' is-blown' : ''}`} type="button" aria-label="Tap the Lotus Biscoff cake to reveal seven birthday memories" onClick={onTap}>
          <img className="cake-photo" src={cakeImage} alt="Lotus Biscoff birthday cake" />
        </button>
        <span className="cake-prompt">{revealedCount >= photos.length ? 'all the good bits' : isBlown ? 'memories are on their way' : 'tap to blow the candles'}</span>
      </div>
    </section>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [ladooFlight, setLadooFlight] = useState(null);
  const [ladooFlightProgress, setLadooFlightProgress] = useState(0);
  const [laduRevealed, setLaduRevealed] = useState(false);
  const [cakeRevealedCount, setCakeRevealedCount] = useState(0);
  const [cakeBlown, setCakeBlown] = useState(false);
  const [birthdayFriendsVisible, setBirthdayFriendsVisible] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const revealRef = useRef(null);
  const boxRef = useRef(null);
  const ladooTargetRef = useRef(null);
  const cakeTimerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.16 });
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => window.clearInterval(cakeTimerRef.current), []);

  useEffect(() => {
    let revealTimer;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(revealTimer);
      if (entry.isIntersecting) {
        revealTimer = window.setTimeout(() => setBirthdayFriendsVisible(true), 2500);
      } else {
        setBirthdayFriendsVisible(false);
      }
    }, { threshold: 0.35 });
    if (revealRef.current) observer.observe(revealRef.current);
    return () => {
      window.clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, []);

  function openSweetBox() {
    if (isOpen) return;
    const boxBounds = boxRef.current?.getBoundingClientRect();
    const targetBounds = ladooTargetRef.current?.getBoundingClientRect();
    if (boxBounds && targetBounds) {
      const startScroll = window.scrollY;
      const endScroll = Math.max(0, targetBounds.top + startScroll + targetBounds.height / 2 - window.innerHeight / 2);
      setLadooFlight({
        startX: boxBounds.left + boxBounds.width / 2,
        startY: boxBounds.top + boxBounds.height / 2,
        endX: targetBounds.left + targetBounds.width / 2,
        endY: window.innerHeight / 2,
        startScroll,
        endScroll,
        count: 7,
      });
      setLadooFlightProgress(0);
    }
    setIsOpen(true);
    setConfettiPieces(Array.from({ length: 38 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${Math.random() * 100}%`,
      color: ['#efb64f', '#e85d45', '#ee9489', '#f9f0e2'][index % 4],
      delay: `${Math.random() * 0.45}s`,
      rotation: `${Math.random() * 90}deg`,
    })));
    window.setTimeout(() => {
      if (!boxRef.current || !ladooTargetRef.current) {
        revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350);
  }

  useEffect(() => {
    if (!ladooFlight) return undefined;
    let frameId;
    const duration = 3200;
    const startedAt = performance.now();
    const updateFlight = (now) => {
      const timeProgress = Math.min(1, (now - startedAt) / duration);
      const progress = timeProgress * timeProgress * (3 - 2 * timeProgress);
      const scrollPosition = ladooFlight.startScroll + (ladooFlight.endScroll - ladooFlight.startScroll) * progress;
      window.scrollTo(0, scrollPosition);
      setLadooFlightProgress(progress);
      if (timeProgress < 1) {
        frameId = window.requestAnimationFrame(updateFlight);
      } else {
        window.setTimeout(() => setLadooFlight(null), 450);
      }
    };
    frameId = window.requestAnimationFrame(updateFlight);
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [ladooFlight]);

  function revealCakeMemories() {
    if (cakeBlown || cakeTimerRef.current) return;
    setCakeBlown(true);
    window.setTimeout(() => {
      setCakeRevealedCount(1);
      cakeTimerRef.current = window.setInterval(() => {
        setCakeRevealedCount((currentCount) => {
          if (currentCount >= photos.length) {
            window.clearInterval(cakeTimerRef.current);
            cakeTimerRef.current = null;
            return currentCount;
          }
          return currentCount + 1;
        });
      }, 650);
    }, 500);
  }

  return (
    <>
      <main>
        <section className="hero" id="top">
          <div className="hero__noise" />
          <nav className="nav"><a className="brand" href="#top" aria-label="Back to top"><span>06</span> / 18</a><span className="nav__note">a tiny archive of you</span></nav>
          <div className="hero__copy reveal"><Eyebrow>An edible little secret</Eyebrow><h1>Welcome to<br /><em>Dudu's</em> surprise<br />birthday party.</h1><p className="hero__intro">For the person who makes ordinary days feel like something worth keeping.</p><div className="dance-feature hero-dance-feature"><div className="dance-feature__copy"><Eyebrow>Best energy only</Eyebrow><p>Dudu is ready to celebrate.</p></div><div className="dance-feature__frame"><img src={duduDanceImage} alt="Dudu dancing happily" /></div></div></div>
          <SweetBox isOpen={isOpen} onOpen={openSweetBox} boxRef={boxRef} />
          <div className="hero__footer"><span>made with a very full heart</span><span>scroll to unwrap the rest ↓</span></div>
        </section>

        <section className="reveal-section" id="reveal" ref={revealRef}>
          <div className={`reveal-card${birthdayFriendsVisible ? ' birthday-ready' : ''}`}><Eyebrow dark>The centre of everything</Eyebrow><div className="reveal-card__content"><div className="birthday-copy"><p className="tiny-label">ONE VERY SPECIAL</p><h2><span className="birthday-first-line">Happy<img className="bubu-image bubu-image--happy" src={bubuImage} alt="Bubu waving beside Happy" /></span> birthday,<br /><span className="birthday-last-line"><em>Ladoo.</em><img className="hbd-image hbd-image--after-ladoo" src={hbdImage} alt="Birthday character holding a cake" /></span></h2></div><div className="ladu-stage" aria-label="A motichur ladu"><div className="sparkle sparkle--one">✦</div><div className="sparkle sparkle--two">✦</div><button ref={ladooTargetRef} className={`ladu${laduRevealed ? ' is-revealed' : ''}${ladooFlight ? ' is-flight-target' : ''}`} type="button" aria-label="Tap the motichur ladu" aria-pressed={laduRevealed} onClick={() => setLaduRevealed(true)}><img className="ladu-image" src={ladooImage} alt="" /></button><div className="ladu-plate" /><span className={`ladu-prompt${laduRevealed ? ' is-revealed' : ''}`}>{laduRevealed ? 'happy birthday, ladoo' : 'tap the ladoo'}</span></div></div><p className="reveal-message">May this year return every bit of light you give to everyone else.</p></div>
          <div className="scroll-cue"><span>keep going</span><i /></div>
        </section>

        <ChocolateCake revealedCount={cakeRevealedCount} isBlown={cakeBlown} onTap={revealCakeMemories} />

        <footer className="footer"><p>For Diamond, with all the love.</p><a href="#top">back to the top ↑</a></footer>
      </main>
      <div className="confetti" aria-hidden="true">{confettiPieces.map((piece) => <i key={piece.id} style={{ left: piece.left, background: piece.color, animationDelay: piece.delay, transform: `rotate(${piece.rotation})` }} />)}</div>
      {ladooFlight && Array.from({ length: ladooFlight.count }, (_, index) => {
        const isLandingLadoo = index === ladooFlight.count - 1;
        const delay = isLandingLadoo ? 0 : index * 0.075;
        const localProgress = Math.min(1, Math.max(0, (ladooFlightProgress - delay) / (1 - delay)));
        const offset = index - 3;
        const rainTargetX = window.innerWidth * ([.08, .27, .49, .72, .92, .38][index] || .5);
        const rainTargetY = window.innerHeight * ([.62, .83, .7, .94, .76, .9][index] || .8);
        const sway = Math.sin(localProgress * Math.PI * 2) * ((index % 2 ? -1 : 1) * (34 + index * 9));
        const x = isLandingLadoo
          ? ladooFlight.startX + (ladooFlight.endX - ladooFlight.startX) * localProgress
          : ladooFlight.startX + (rainTargetX - ladooFlight.startX) * localProgress + sway;
        const rainDrop = isLandingLadoo ? 0 : ladooFlight.startY + (rainTargetY - ladooFlight.startY) * Math.pow(localProgress, 1.08);
        const y = isLandingLadoo
          ? ladooFlight.startY + (ladooFlight.endY - ladooFlight.startY) * localProgress
          : rainDrop;
        const opacity = isLandingLadoo
          ? 1
          : Math.min(1, localProgress * 5) * (localProgress > .72 ? 1 - ((localProgress - .72) / .28) : 1);
        const scale = isLandingLadoo ? .45 + localProgress * .55 : .34 + localProgress * .42;
        return <img className={`ladoo-flight${isLandingLadoo ? ' ladoo-flight--landing' : ' ladoo-flight--rain'}`} style={{ left: `${x}px`, top: `${y}px`, opacity, transform: `translate(-50%, -50%) scale(${scale}) rotate(${offset * 9 + localProgress * 270}deg)` }} key={index} src={ladooImage} alt="" aria-hidden="true" />;
      })}
    </>
  );
}

export default App;
