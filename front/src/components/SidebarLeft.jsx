import React from 'react';
import './components.css';
import {
  AiFillHome,
  AiFillWechat,
  AiFillTags,
  AiFillQuestionCircle,
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillDribbbleSquare,
  AiFillTwitterSquare,
  AiFillInstagram,
} from 'react-icons/ai';

const navItemsInfo = [
  { icon: <AiFillHome />, name: 'Home', type: 'link', href: '/' },
  { icon: <AiFillWechat />, name: 'Topics', type: 'link', href: '/articles' },
  { icon: <AiFillTags />, name: 'Tags', type: 'link', href: '/tags' },
  { icon: <AiFillQuestionCircle />, name: 'Faq', type: 'link', href: '/faq' },
];

const SidebarLeft = React.forwardRef((props, ref) => {
  const navItems = navItemsInfo.map((item) => (
    <li key={item.name}>
      <span>{item.icon}</span>
      <a href={item.href}>{item.name}</a>
    </li>
  ));

  return (
    <section ref={ref} className="sidebarLeft">
      <div className="content-wrapper">
        <ul className="navItems">{navItems}</ul>
      </div>
      <div className="links">
        <ul>
          <li>
            <a href="/">Code of Conduct</a>
          </li>
          <li>
            <a href="/">Privacy Policy</a>
          </li>
          <li>
            <a href="/">Terms of Use</a>
          </li>
        </ul>
      </div>

      <div className="socmed">
        <ul>
          <li>
            <a href="/">
              <AiFillGithub className="icons" />
            </a>
          </li>
          <li>
            <a href="/">
              <AiFillLinkedin className="icons" />
            </a>
          </li>
          <li>
            <a href="/">
              <AiFillFacebook className="icons" />
            </a>
          </li>
          <li>
            <a href="/">
              <AiFillDribbbleSquare className="icons" />
            </a>
          </li>
          <li>
            <a href="/">
              <AiFillTwitterSquare className="icons" />
            </a>
          </li>
          <li>
            <a href="/">
              <AiFillInstagram className="icons" />
            </a>
          </li>
        </ul>
      </div>
      <hr />

      <div className="copyright">
        <h2>JAR Community</h2>
        <p className="desc">
          Enter a world where code transforms into connections. Our developer
          community, crafted by a 3-person <span>Jury</span>, <span>Andro</span>
          , and <span>RJ</span>, passionate about web development, is where
          innovation and brilliance come alive. Join us and be part of the
          journey.
        </p>
        <p className="hash">#CodeAndConnect</p>
        <p className="copy">Copyright &copy; 2023. All rights reserved.</p>
      </div>
    </section>
  );
});

export default SidebarLeft;
