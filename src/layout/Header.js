import React from 'react';
import Flex from '../components/Flex';
import Title from '../components/Title';

const Header = () => (
  <Flex
    boxShadow="md"
    backgroundColor="white"
    justifyContent="center"
    alignItems="center"
    padding="sm">
      <Title href="/" title="Home">
      Meal Box
      </Title>   
  </Flex>
);

export default Header;
