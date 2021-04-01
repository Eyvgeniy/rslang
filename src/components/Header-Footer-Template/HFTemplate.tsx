import React from 'react';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

const HFTemplate = (props: React.PropsWithChildren<unknown>): JSX.Element => (
  <>
    <Header />
    {props.children}
    <Footer />
  </>
);

export default HFTemplate;
