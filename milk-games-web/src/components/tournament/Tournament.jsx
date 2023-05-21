/**
 * @typedef {import("@types/index.d").Tournament} Tournament
 */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '@actions/tournament';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react';

import Header from '@components/common/header/Header';
import SectionHeading from '@components/common/section/SectionHeading';

import { TournamentService } from '@utils/api-service';
import Bracket from './bracket/Bracket';
import { useLoaderData } from 'react-router-dom';

/**
 *
 * Teams
 * Bracket + matches
 *
 */

const Tournament = () => {
  const tournament = useLoaderData();

  console.log({ tournament });

  /**
   * @type {[Tournament, Function]}
   */

  const { colorMode } = useColorMode();

  return (
    <Box w="100%">
      <Header />

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="RULES"></SectionHeading>
        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="TEAMS"></SectionHeading>
        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box
        mt={24}
        mx="auto"
        w={{ base: '100%', md: '3xl', lg: '4xl' }}
        p={{ base: 4, md: 4 }}
      >
        <SectionHeading title="BRACKET"></SectionHeading>

        <Bracket
          matches={tournament.matches}
          teamLimit={tournament.teamLimit}
        />

        {/* Table of the teams? */}
        {/* List of all team cards */}
      </Box>

      <Box h="300px"></Box>
    </Box>
  );
};

export default Tournament;
