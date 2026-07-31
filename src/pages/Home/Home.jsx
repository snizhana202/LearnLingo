import { Link } from 'react-router-dom';
import './Home.scss';

const STATS = [
  { value: '32,000+', label: 'Experienced tutors' },
  { value: '300,000+', label: '5-star tutor reviews' },
  { value: '120+', label: 'Subjects taught' },
  { value: '200+', label: 'Tutor nationalities' },
];

export default function Home() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Unlock your potential with the best <em>language</em> tutors
          </h1>
          <p className="hero__text">
            Embark on an exciting language journey with expert language tutors. Elevate your
            language proficiency to new heights by connecting with highly qualified and
            experienced tutors.
          </p>
          <Link to="/teachers" className="btn btn-primary hero__cta">
            Get started
          </Link>
        </div>

        <div className="hero__illustration">
          <img src="/block.png" alt="Language tutor illustration" />
        </div>
      </div>

      <div className="container">
        <ul className="hero__stats">
          {STATS.map((stat) => (
            <li key={stat.label} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}