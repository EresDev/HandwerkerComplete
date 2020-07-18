import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <section id="footer">
        <div className="inner">
          <header>
            <h2>Get in Touch</h2>
          </header>
          <form method="post" action="#">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name"/>
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email"/>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows={6} defaultValue={""}/>
            </div>
            <ul className="actions">
              <li><input type="submit" className="alt" value="Send Message"/></li>
            </ul>
          </form>
          <div className="copyright">
            © Untitled Design: <a href="https://templated.co/">TEMPLATED</a>. Images <a
            href="https://unsplash.com/">Unsplash</a>
          </div>
        </div>
      </section>
    );
  }
}