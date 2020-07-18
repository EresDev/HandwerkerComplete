import React from 'react';
import {withTranslation} from "react-i18next";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* Banner */}
        <section id="banner">
          <div className="inner">
            <h1>Handwerker: <span>{this.props.t("common:home.heading1")}<br/>
              {this.props.t("common:home.heading2")}</span></h1>
            <ul className="actions">
              <li><a href="#" className="button alt">
                {this.props.t("common:home.getStarted")}
              </a></li>
            </ul>
          </div>
        </section>
        {/* One */}
        <section id="one">
          <div className="inner">
            <header>
              <h2>Magna Etiam Lorem</h2>
            </header>
            <p>Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit amet mi ullamcorper vehicula.
              Integer adipiscin sem. Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan quis,
              faucibus non, congue vel, arcu, erisque hendrerit tellus. Integer sagittis. Vivamus a mauris eget arcu
              gravida tristique. Nunc iaculis mi in ante.</p>
            <ul className="actions">
              <li><a href="#" className="button alt">Learn More</a></li>
            </ul>
          </div>
        </section>
        {/* Two */}
        <section id="two">
          <div className="inner">
            <article>
              <div className="content">
                <header>
                  <h3>Pellentesque adipis</h3>
                </header>
                <div className="image fit">
                  <img src="build/images/pic01.jpg" alt=""/>
                </div>
                <p>Cumsan mollis eros. Pellentesque a diam sit amet mi magna ullamcorper vehicula. Integer adipiscin
                  sem. Nullam quis massa sit amet lorem ipsum feugiat tempus.</p>
              </div>
            </article>
            <article className="alt">
              <div className="content">
                <header>
                  <h3>Morbi interdum mol</h3>
                </header>
                <div className="image fit">
                  <img src="build/images/pic02.jpg" alt=""/>
                </div>
                <p>Cumsan mollis eros. Pellentesque a diam sit amet mi magna ullamcorper vehicula. Integer adipiscin
                  sem. Nullam quis massa sit amet lorem ipsum feugiat tempus.</p>
              </div>
            </article>
          </div>
        </section>
        {/* Three */}
        <section id="three">
          <div className="inner">
            <article>
              <div className="content">
                <span className="icon fa-laptop"/>
                <header>
                  <h3>Tempus Feugiat</h3>
                </header>
                <p>Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna lorem ullamcorper laoreet,
                  lectus arcu.</p>
                <ul className="actions">
                  <li><a href="#" className="button alt">Learn More</a></li>
                </ul>
              </div>
            </article>
            <article>
              <div className="content">
                <span className="icon fa-diamond"/>
                <header>
                  <h3>Aliquam Nulla</h3>
                </header>
                <p>Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh
                  sed.</p>
                <ul className="actions">
                  <li><a href="#" className="button alt">Learn More</a></li>
                </ul>
              </div>
            </article>
            <article>
              <div className="content">
                <span className="icon fa-laptop"/>
                <header>
                  <h3>Sed Magna</h3>
                </header>
                <p>Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit amet mi ullamcorper
                  vehicula.</p>
                <ul className="actions">
                  <li><a href="#" className="button alt">Learn More</a></li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Home);