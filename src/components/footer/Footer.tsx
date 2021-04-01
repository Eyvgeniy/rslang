import * as React from 'react';
import './Footer.css';

export function Footer(): JSX.Element {
  return (
    <footer>
      <div className="light-gray d-flex align-items-center justify-content-center">
        <div className="w-100 d-flex justify-content-around m-3">
          <div>
            <a href="https://rs.school/react/">
              <img src="https://rs.school/images/rs_school_js.svg" width="80" alt="github link" />
            </a>
          </div>
          <div className="d-flex flex-wrap justify-content-between ml-4">
            <div>
              <a href="https://github.com/Eyvgeniy">
                <img
                  src="https://img.icons8.com/nolan/64/github.png"
                  width="35"
                  alt="github link"
                />
                @eyvgeniy
              </a>
            </div>
            <div>
              <a href="https://github.com/MrBlacky01">
                <img
                  src="https://img.icons8.com/nolan/64/github.png"
                  width="35"
                  alt="github link"
                />
                @MrBlacky01
              </a>
            </div>
            <div>
              <a href="https://github.com/Natallia22">
                <img
                  src="https://img.icons8.com/nolan/64/github.png"
                  width="35"
                  alt="github link"
                />
                @Natallia22
              </a>
            </div>
            <div>
              <a href="https://github.com/MAXONVTEC">
                <img
                  src="https://img.icons8.com/nolan/64/github.png"
                  width="35"
                  alt="github link"
                />
                @MAXONVTEC
              </a>
            </div>
          </div>
          <div>© 2021</div>
        </div>
      </div>
    </footer>
  );
}
